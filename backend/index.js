import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import * as processor from "./processor.js";
import * as adminProcessor from "./processor-admin.js";
import { upload } from "./utils.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

/* =========================
   HELPER WRAPPER
========================= */

const handleRequest = (fn) => {
  return async (req, res) => {
    try {
      const input = {
        ...req.body,
        ...req.params,
        ...req.query,
        file: req.file,
        authHeader: req.headers.authorization,
      };

      const result = await fn(input);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 0,
        msg: "Internal Server Error",
      });
    }
  };
};

// Admin auth middleware - delegates to processor-admin adminAuthCheck
const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ status: 0, msg: "Please login" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    const result = await adminProcessor.adminAuthCheck({ token });
    if (!result || result.status !== 1) {
      return res.status(401).json({ status: 0, msg: "Unauthorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ status: 0, msg: "Unauthorized" });
  }
};

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    status: 1,
    msg: "CareBridge API running",
  });
});

/* =========================
   ADMIN AUTH ROUTES
========================= */

app.post("/admin/register", handleRequest(adminProcessor.adminRegister));
app.post("/admin/login", handleRequest(adminProcessor.adminLogin));
app.post("/admin/logout", handleRequest(adminProcessor.adminLogout));
app.post("/admin/auth-check", handleRequest(adminProcessor.adminAuthCheck));

/* =========================
   SERVICES ROUTES
========================= */

app.post("/services", adminAuth, upload.single("logo"), handleRequest(processor.createService));
app.get("/services", handleRequest(processor.getAllServices));
app.get("/services/count", handleRequest(processor.getServicesCount));
app.get("/services/:uuid", handleRequest(processor.getServiceData));
app.put("/services/:uuid", adminAuth, upload.single("logo"), handleRequest(processor.editService));
app.delete(
  "/services/:uuid",
  adminAuth,
  handleRequest(processor.deleteService),
);

/* =========================
   COMPLAINT ROUTES
========================= */

app.post("/complaints", handleRequest(processor.createComplaint));
app.get(
  "/complaints/stats",
  adminAuth,
  handleRequest(processor.getComplaintStats),
);
app.get(
  "/complaints/stats/:companyUuid",
  adminAuth,
  handleRequest(processor.getCompanyStats),
);

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
  console.log(`CareBridge API running on port ${PORT}`);
});
