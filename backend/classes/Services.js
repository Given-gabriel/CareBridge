import { v4 as uuidv4 } from "uuid";
import database from "../database.js";

class Service {
  // 🔹 PRIVATE EXECUTE WRAPPER
  static async _execute(sql, params = []) {
    return await database.execute(sql, params);
  }

  // 🔹 PRIVATE FIND METHOD (Reusable)
  static async _findByUUID(uuid) {
    const rows = await this._execute(`SELECT * FROM companies WHERE uuid = ?`, [
      uuid,
    ]);
    return rows[0] || null;
  }

  // ✅ CREATE SERVICE
  static async create(name, description, logo) {
    const uuid = uuidv4();

    await this._execute(
      `INSERT INTO companies (uuid, name, description, logo)
       VALUES (?, ?, ?, ?)`,
      [uuid, name, description, logo],
    );

    return { message: "Service created successfully", uuid };
  }

  // ✅ UPDATE SERVICE
  static async update(uuid, name, description, logo) {
    const existing = await this._findByUUID(uuid);
    if (!existing) {
      throw new Error("Service not found");
    }

    await this._execute(
      `UPDATE companies
       SET name = ?, description = ?, logo = ?
       WHERE uuid = ?`,
      [name, description, logo, uuid],
    );

    return { message: "Service updated successfully" };
  }

  // ✅ DELETE SERVICE
  static async delete(uuid) {
    const existing = await this._findByUUID(uuid);
    if (!existing) {
      throw new Error("Service not found");
    }

    await this._execute(`DELETE FROM companies WHERE uuid = ?`, [uuid]);

    return { message: "Service deleted successfully" };
  }

  // ✅ GET ALL SERVICES
  static async getAll() {
    return await this._execute(
      `SELECT * FROM companies ORDER BY created_at DESC`,
    );
  }

  // ✅ GET ONE SERVICE
  static async getOne(uuid) {
    const service = await this._findByUUID(uuid);
    if (!service) {
      throw new Error("Service not found");
    }

    return service;
  }

  // ✅ COUNT SERVICES
  static async count() {
    const rows = await this._execute(`SELECT COUNT(*) AS total FROM companies`);

    return rows[0].total;
  }
}

export default Service;
