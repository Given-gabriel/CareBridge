import Admin from "./classes/Admin.js";
import { v4 as uuidv4 } from "uuid";
import {generateToken} from "./utils.js";

export async function adminRegister(input) {
  try {
    if (!input?.username || !input?.password) {
      return { status: 0, msg: "Invalid details" };
    }

    const uuid = uuidv4();

    const result = await Admin.register(uuid, input.username, input.password);

    return {
      status: 1,
      msg: "Admin registered successfully",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return { status: 0, msg: error.message };
  }
}

export async function adminLogin(input) {
  try {
    if (!input?.username || !input?.password) {
      return { status: 0, msg: "Invalid details" };
    }

    const result = await Admin.login(input.username, input.password);

    if (!result) {
      return { status: 0, msg: "Invalid credentials" };
    }

    return {
      status: 1,
      msg: "Welcome",
      admin: result,
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

export async function adminLogout(input) {
  try {
    let username = input?.username;

    if (!username) {
      const authHeader = input?.authHeader;
      if (!authHeader) {
        return { status: 0, msg: "Invalid details" };
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

      const decoded = await Admin.authCheck(token);
      username = decoded.username;
    }

    const success = await Admin.logout(username);

    if (!success) {
      return { status: 0, msg: "Cannot process request" };
    }

    return {
      status: 1,
      msg: "Logged out successfully",
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

export async function adminAuthCheck(input) {
  try {
    let token = input?.token;
    if (!token) {
      const authHeader = input?.authHeader;
      if (!authHeader) {
        return { status: 0, msg: "Please login" };
      }

      token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;
    }

    const isAuthorized = await Admin.authCheck(token);

    if (!isAuthorized) {
      return { status: 0, msg: "Unauthorized" };
    }

    return {
      status: 1,
      auth: 1,
      msg: "Authorized",
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}
