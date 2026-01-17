import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

export async function getAdditives() {
  try {
    const res = await axiosInstance.get(`${API_URL}/additives/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load additives. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load additives. Request error: ${error.request}`,
      );
    } else {
      throw new Error(`Couldn't load additives. Error: ${error.message}`);
    }
  }
}

export async function getSearchAdditives({ filters, sortBy, page, size }) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/additives/search`, params].filter(Boolean).join("?"),
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched additives. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched additives. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't load searched additives. Error: ${error.message}`,
      );
    }
  }
}

export async function getAdditive(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/additives/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find additive #${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find additive #${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(`Couldn't find additive #${id}. Error: ${error.message}`);
    }
  }
}

export async function createAdditive(additive) {
  try {
    const res = await axiosInstance.post(`${API_URL}/additives/`, additive);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Cet additif existe déjà.`);
      throw new Error(
        `Couldn't create additive. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create additive. Request error: ${error.request}`,
      );
    } else {
      throw new Error(`Couldn't create additive. Error: ${error.message}`);
    }
  }
}

export async function updateAdditive(id, additive) {
  try {
    const res = await axiosInstance.put(`${API_URL}/additives/${id}`, additive);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Cette marque de cosmétique existe déjà.`);
      throw new Error(
        `Couldn't update additive # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update additive # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't update additive # ${id}. Error: ${error.message}`,
      );
    }
  }
}

export async function deleteAdditive(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/additives/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete additive # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete additive # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't delete additive # ${id}. Error: ${error.message}`,
      );
    }
  }
}
