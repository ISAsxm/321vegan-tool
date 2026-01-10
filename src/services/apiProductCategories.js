import { buildURLSearchParams, sortByInputFirst } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "./axiosInstance";

export async function getProductCategories() {
  try {
    const res = await axiosInstance.get(`${API_URL}/product-categories/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load product categories. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load product categories. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load product categories. Error: ${error.message}`
      );
    }
  }
}

export async function getSearchProductCategories({
  filters,
  sortBy,
  page,
  size,
}) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/product-categories/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched product categories. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched product categories. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load searched product categories. Error: ${error.message}`
      );
    }
  }
}

export async function getProductCategoriesForSelect(searchName = "") {
  try {
    const res = await axiosInstance.get(`${API_URL}/product-categories/`);
    const data = await res.data;
    return {
      data: sortByInputFirst(
        searchName,
        data.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      ),
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load product categories. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load product categories. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load product categories. Error: ${error.message}`
      );
    }
  }
}

export async function getProductCategory(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/product-categories/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find product category #${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find product category #${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't find product category #${id}. Error: ${error.message}`
      );
    }
  }
}

export async function createProductCategory(productCategory) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/product-categories/`,
      productCategory
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Cette catégorie existe déjà.`);
      throw new Error(
        `Couldn't create product category. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create product category. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't create product category. Error: ${error.message}`
      );
    }
  }
}

export async function updateProductCategory(id, productCategory) {
  try {
    const res = await axiosInstance.put(
      `${API_URL}/product-categories/${id}`,
      productCategory
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update product category # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update product category # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't update product category # ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function deleteProductCategory(id) {
  try {
    const res = await axiosInstance.delete(
      `${API_URL}/product-categories/${id}`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(
          `Cette catégorie est utilisée par au moins 1 produit d'intérêt.`
        );
      throw new Error(
        `Couldn't delete product category # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete product category # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't delete product category # ${id}. Error: ${error.message}`
      );
    }
  }
}
