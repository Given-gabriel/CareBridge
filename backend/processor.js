import dotenv from "dotenv";
import Service from "./classes/Services.js";
import Complaint from "./classes/Complaints.js";

dotenv.config();

/* =========================
    SERVICES
========================= */

export async function createService(input) {
  try {
    if (!input.name || !input.description || !input.file) {
      return { status: 0, msg: "Missing required fields" };
    }

    const logoPath = `uploads/services/${input.file.filename}`;

    const result = await Service.create(
      input.name,
      input.description,
      logoPath,
    );

    return {
      status: 1,
      msg: "Service created",
      data: result,
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

export async function editService(input) {
  try {
    if (!input?.uuid) {
      return { status: 0, msg: "Invalid details" };
    }

    await Service.update(input.uuid, input.name, input.description, input.logo);

    return {
      status: 1,
      msg: "Service updated",
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

export async function deleteService(input) {
  try {
    if (!input?.uuid) {
      return { status: 0, msg: "Invalid details" };
    }

    await Service.delete(input.uuid);

    return {
      status: 1,
      msg: "Service deleted",
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

export async function getAllServices() {
  try {
    const result = await Service.getAll();

    const servicesWithFullLogoUrl = result.map((service) => ({
      ...service,
      logo: service.logo ? `${process.env.BASE_URL}/${service.logo}` : null,
    }));

    return {
      status: 1,
      data: servicesWithFullLogoUrl,
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

export async function getServiceData(input) {
  try {
    if (!input?.uuid) {
      return { status: 0, msg: "Invalid details" };
    }

    const result = await Service.getOne(input.uuid);

    // Add full URL for logo
    const serviceWithFullLogoUrl = {
      ...result,
      logo: result.logo ? `${process.env.BASE_URL}/${result.logo}` : null,
    };

    return {
      status: 1,
      data: serviceWithFullLogoUrl,
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

export async function getServicesCount() {
  try {
    const count = await Service.count();

    return {
      status: 1,
      count,
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

/* =========================
    COMPLAINTS
========================= */

export async function createComplaint(input) {
  try {
    if (!input?.service_uuid || !input?.type || !input?.description) {
      return { status: 0, msg: "Invalid details" };
    }

    // Map service_uuid to company_uuid (database column name)
    const complaintData = {
      category: input.type,
      company_uuid: input.service_uuid,
      phone: input.phone || "",
      email: input.email,
      title: input.title,
      description: input.description,
    };

    const result = await Complaint.create(complaintData);

    return {
      status: 1,
      msg: "Submitted successfully",
      data: result,
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

export async function getComplaintStats() {
  try {
    const result = await Complaint.getGlobalStats();

    return {
      status: 1,
      data: result,
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}

export async function getCompanyStats(uuid) {
  try {
    const companyUuid =
      input?.companyUuid || input?.company_uuid || input?.uuid;

    if (!companyUuid) {
      return { status: 0, msg: "Invalid details" };
    }

    const result = await Complaint.getCompanyStats(companyUuid);

    return {
      status: 1,
      data: result,
    };
  } catch (error) {
    return { status: 0, msg: error.message };
  }
}
