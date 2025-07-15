import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

export async function getApiClients() {
  try {
    const res = await axiosInstance.get(`${API_URL}/apiclients/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load apiclients. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load apiclients. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load apiclients. Error: ${error.message}`);
    }
  }
}

export async function getSearchApiClients({ filters, sortBy, page, size }) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/apiclients/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched apiclients. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched apiclients. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load searched apiclients. Error: ${error.message}`
      );
    }
  }
}

export async function getApiClient(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/apiclients/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find apiclient #${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find apiclient #${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't find apiclient #${id}. Error: ${error.message}`
      );
    }
  }
}

export async function createApiClient(apiclient) {
  try {
    const res = await axiosInstance.post(`${API_URL}/apiclients/`, apiclient);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't create apiclient. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create apiclient. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't create apiclient. Error: ${error.message}`);
    }
  }
}

export async function updateApiClient(id, apiclient) {
  try {
    const res = await axiosInstance.put(
      `${API_URL}/apiclients/${id}`,
      apiclient
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update apiclient # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update apiclient # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't update apiclient # ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function deleteApiClient(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/apiclients/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete apiclient # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete apiclient # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't delete apiclient # ${id}. Error: ${error.message}`
      );
    }
  }
}
