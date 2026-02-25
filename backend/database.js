import mysql from "mysql2/promise";
import SystemParams from "./SystemParams.js";

const pool = mysql.createPool({
  host: SystemParams.MYSQL_DB_HOST,
  user: SystemParams.MYSQL_DB_USER,
  database: SystemParams.MYSQL_DB_NAME,
  password: SystemParams.MYSQL_DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const database = {
  execute: async function (query, paramsArray) {
    try {
      const [results] = await pool.execute(query, paramsArray);

      return results;
    } catch (error) {
      throw error;
    }
  },
};

export default database;