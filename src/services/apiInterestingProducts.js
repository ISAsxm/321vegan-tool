import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "./axiosInstance";

export async function getInterestingProducts() {
  try {
    const res = await axiosInstance.get(`${API_URL}/interesting-products/`);
    const data = res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load interesting products. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load interesting products. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load interesting products. Error: ${error.message}`
      );
    }
  }
}

export async function getSearchInterestingProducts({
  filters,
  sortBy,
  page,
  size,
}) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/interesting-products/search`, params]
        .filter(Boolean)
        .join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched interesting products. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched interesting products. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load searched interesting products. Error: ${error.message}`
      );
    }
  }
}

export async function getInterestingProduct(id) {
  try {
    const res = await axiosInstance.get(
      `${API_URL}/interesting-products/${id}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load interesting product ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load interesting product ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load interesting product ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function createInterestingProduct(newProduct) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/interesting-products/`,
      newProduct
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't create interesting product. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create interesting product. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't create interesting product. Error: ${error.message}`
      );
    }
  }
}

export async function updateInterestingProduct({ id, newData }) {
  try {
    const res = await axiosInstance.put(
      `${API_URL}/interesting-products/${id}`,
      newData
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update interesting product ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update interesting product ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't update interesting product ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function deleteInterestingProduct(id) {
  try {
    const res = await axiosInstance.delete(
      `${API_URL}/interesting-products/${id}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete interesting product ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete interesting product ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't delete interesting product ${id}. Error: ${error.message}`
      );
    }
  }
}
