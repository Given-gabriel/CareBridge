import dotenv from "dotenv";
import database from "../database.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} from "../utils.js";

dotenv.config();

export default class Admin {
  constructor(username) {
    this.username = username;
  }

  //get data function
  static getData = async function (username) {
    try {
      const rows = await database.execute(
        "SELECT * FROM users WHERE username = ?",
        [username],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  };

  /////////admin registeration /////////
  static register = async function (uuid, username, password) {
    try {
      //check if user available
      const availableUser = await this.getData(username);

      if (availableUser) {
        throw new Error("Username already exists");
      }

      const passwordHash = await hashPassword(password);

      await database.execute(
        "INSERT INTO users (uuid, username, password) VALUES (?, ?, ?)",
        [uuid, username, passwordHash],
      );

      return { uuid, username };
    } catch (error) {
      throw error;
    }
  };

  ////////admin login //////////
  static login = async function (username, password) {
    try {
      //check if user available
      const availableUser = await this.getData(username);

      if (!availableUser) {
        return null;
      }

      //compare password
      const isMatch = await comparePassword(password, availableUser.password);

      if (!isMatch) {
        return null;
      }

      const payload = {
        uuid: availableUser.uuid,
        username: availableUser.username,
      };

      const token = await generateToken(payload);

      const query = `
        UPDATE users
        SET jwt_token = ?
        WHERE uuid = ?
      `;

      const result = await database.execute(query, [token, availableUser.uuid]);

      return {
        uuid: availableUser.uuid,
        username: availableUser.username,
        token,
      };
    } catch (error) {
      throw error;
    }
  };

  /////admin logout //////////
  static async logout(username) {
    try {
      const query = `
        UPDATE users
        SET jwt_token = NULL
        WHERE username = ?
      `;

      const result = await database.execute(query, [username]);

      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  ////////auth check //////////
  static async authCheck(token) {
    try {
      // First verify the JWT signature
      const decoded = await verifyToken(token);

      // Then verify the token exists in the database for this user
      const query = `SELECT jwt_token FROM users WHERE uuid = ?`;
      const rows = await database.execute(query, [decoded.uuid]);

      if (!rows || rows.length === 0) {
        throw new Error("User not found");
      }

      // Check if the token in database matches the provided token
      const dbToken = rows[0].jwt_token;
      if (!dbToken || dbToken !== token) {
        throw new Error("Token has been invalidated");
      }

      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
