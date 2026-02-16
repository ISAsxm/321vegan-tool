import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

export async function getPartners() {
  try {
    const res = await axiosInstance.get(`${API_URL}/partners/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load partners. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load partners. Request error: ${error.request}`,
      );
    } else {
      throw new Error(`Couldn't load partners. Error: ${error.message}`);
    }
  }
}

export async function getSearchPartners({ filters, sortBy, page, size }) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/partners/search`, params].filter(Boolean).join("?"),
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched partners. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched partners. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't load searched partners. Error: ${error.message}`,
      );
    }
  }
}

export async function getPartner(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/partners/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find partner #${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find partner #${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(`Couldn't find partner #${id}. Error: ${error.message}`);
    }
  }
}

export async function createPartner(partner) {
  try {
    const res = await axiosInstance.post(`${API_URL}/partners/`, partner);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Ce partenaire existe déjà.`);
      throw new Error(
        `Couldn't create partner. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create partner. Request error: ${error.request}`,
      );
    } else {
      throw new Error(`Couldn't create partner. Error: ${error.message}`);
    }
  }
}

export async function updatePartner(id, partner) {
  try {
    const res = await axiosInstance.put(`${API_URL}/partners/${id}`, partner);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Ce partenaire existe déjà.`);
      throw new Error(
        `Couldn't update partner # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update partner # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't update partner # ${id}. Error: ${error.message}`,
      );
    }
  }
}

export async function deletePartner(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/partners/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete partner # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete partner # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't delete partner # ${id}. Error: ${error.message}`,
      );
    }
  }
}

export async function uploadPartnerLogo(id, logoFile) {
  try {
    const formData = new FormData();
    formData.append("file", logoFile);

    const res = await axiosInstance.post(
      `${API_URL}/partners/${id}/upload-logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't upload logo for partner # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't upload logo for partner # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't upload logo for partner # ${id}. Error: ${error.message}`,
      );
    }
  }
}

export async function deletePartnerLogo(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/partners/${id}/logo`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete logo for partner # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete logo for partner # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't delete logo for partner # ${id}. Error: ${error.message}`,
      );
    }
  }
}
