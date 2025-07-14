import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

export async function getCosmetics() {
  try {
    const res = await axiosInstance.get(`${API_URL}/cosmetics`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load cosmetics. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load cosmetics. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load cosmetics. Error: ${error.message}`);
    }
  }
}

export async function getSearchCosmetics({ filters, sortBy, page, size }) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/cosmetics/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched cosmetics. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched cosmetics. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load searched cosmetics. Error: ${error.message}`
      );
    }
  }
}

export async function getCosmetic(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/cosmetics/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find cosmetic #${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find cosmetic #${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't find cosmetic #${id}. Error: ${error.message}`);
    }
  }
}

export async function createCosmetic(cosmetic) {
  try {
    const res = await axiosInstance.post(`${API_URL}/cosmetics`, cosmetic);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't create cosmetic. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create cosmetic. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't create cosmetic. Error: ${error.message}`);
    }
  }
}

export async function updateCosmetic(id, cosmetic) {
  try {
    const res = await axiosInstance.put(`${API_URL}/cosmetics/${id}`, cosmetic);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update cosmetic # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update cosmetic # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't update cosmetic # ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function deleteCosmetic(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/cosmetics/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete cosmetic # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete cosmetic # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't delete cosmetic # ${id}. Error: ${error.message}`
      );
    }
  }
}
