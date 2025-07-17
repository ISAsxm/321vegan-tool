import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "./axiosInstance";

export async function countProducts(filters) {
  try {
    const params = new URLSearchParams();
    // FILTER
    if (filters) {
      filters.map((f) => params.append(f.field, f.value));
    }
    const res = await axiosInstance.get(
      [`${API_URL}/products/count`, params.toString()].filter(Boolean).join("?")
    );
    const data = res.data;
    return { count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load products. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load products. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load products. Error: ${error.message}`);
    }
  }
}

export async function getProducts() {
  try {
    const res = await axiosInstance.get(`${API_URL}/products/`);
    const data = res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load products. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load products. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load products. Error: ${error.message}`);
    }
  }
}

export async function getSearchProducts({ filters, sortBy, page, size }) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/products/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched products. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched products. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load searched products. Error: ${error.message}`
      );
    }
  }
}

export async function getProduct(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/products/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find product #${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find product #${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't find product #${id}. Error: ${error.message}`);
    }
  }
}

export async function createProduct(product) {
  try {
    const res = await axiosInstance.post(`${API_URL}/products/`, product);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't create product. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create product. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't create product. Error: ${error.message}`);
    }
  }
}

export async function updateProduct(id, product) {
  try {
    const res = await axiosInstance.put(`${API_URL}/products/${id}`, product);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update product # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update product # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't update product # ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function deleteProduct(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/products/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete product # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete product # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't delete product # ${id}. Error: ${error.message}`
      );
    }
  }
}
