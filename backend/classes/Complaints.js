import { v4 as uuidv4 } from "uuid";
import database from "../database.js";

class Complaint {
  // 🔹 PRIVATE EXECUTE WRAPPER
  static async _execute(sql, params = []) {
    return await database.execute(sql, params);
  }

  // 🔹 REUSABLE STATS QUERY
  static async _getStats(whereClause = "", params = []) {
    const sql = `
      SELECT 
        category,
        status,
        COUNT(*) as total
      FROM complaints
      ${whereClause}
      GROUP BY category, status
    `;

    return await this._execute(sql, params);
  }

  // ✅ CREATE Complaint / Suggestion
  static async create(data) {
    const { category, company_uuid, phone, email, title, description } = data;

    if (!["complaint", "suggestion"].includes(category)) {
      throw new Error("Invalid category");
    }

    const uuid = uuidv4();

    await this._execute(
      `INSERT INTO complaints
       (uuid, category, company_uuid, phone, email, title, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [uuid, category, company_uuid, phone, email, title, description],
    );

    return { message: "Submitted successfully", uuid };
  }

  // ✅ GLOBAL STATS
  static async getGlobalStats() {
    return await this._getStats();
  }

  // ✅ COMPANY-WISE STATS
  static async getCompanyStats(company_uuid) {
    return await this._getStats(`WHERE company_uuid = ?`, [company_uuid]);
  }

  // ✅ UPDATE STATUS
  static async updateStatus(uuid, status) {
    if (!["in_progress", "solved"].includes(status)) {
      throw new Error("Invalid status");
    }

    const result = await this._execute(
      `UPDATE complaints SET status = ? WHERE uuid = ?`,
      [status, uuid],
    );

    if (result.affectedRows === 0) {
      throw new Error("Complaint not found");
    }

    return { message: "Status updated successfully" };
  }
}

export default Complaint;
