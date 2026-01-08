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

export async function getProductCategoriesForSelect(searchName = "") {
  try {
    const res = await axiosInstance.get(`${API_URL}/product-categories/`);
    console.log(res);
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
