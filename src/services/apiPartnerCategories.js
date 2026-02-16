import { buildURLSearchParams, sortByInputFirst } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "./axiosInstance";

export async function getPartnerCategories() {
  try {
    const res = await axiosInstance.get(`${API_URL}/partner-categories/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load partner categories. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load partner categories. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't load partner categories. Error: ${error.message}`,
      );
    }
  }
}

export async function getSearchPartnerCategories({
  filters,
  sortBy,
  page,
  size,
}) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/partner-categories/search`, params]
        .filter(Boolean)
        .join("?"),
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched partner categories. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched partner categories. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't load searched partner categories. Error: ${error.message}`,
      );
    }
  }
}

export async function getPartnerCategoriesForSelect(searchName = "") {
  try {
    const res = await axiosInstance.get(`${API_URL}/partner-categories/`);
    const data = await res.data;
    return {
      data: sortByInputFirst(
        searchName,
        data.map((category) => ({
          value: category.id,
          label: category.name,
        })),
      ),
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load partner categories. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load partner categories. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't load partner categories. Error: ${error.message}`,
      );
    }
  }
}

export async function getPartnerCategory(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/partner-categories/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find partner category #${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find partner category #${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't find partner category #${id}. Error: ${error.message}`,
      );
    }
  }
}

export async function createPartnerCategory(partnerCategory) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/partner-categories/`,
      partnerCategory,
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Cette catégorie de partenaire existe déjà.`);
      throw new Error(
        `Couldn't create partner category. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create partner category. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't create partner category. Error: ${error.message}`,
      );
    }
  }
}

export async function updatePartnerCategory(id, partnerCategory) {
  try {
    const res = await axiosInstance.put(
      `${API_URL}/partner-categories/${id}`,
      partnerCategory,
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update partner category # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update partner category # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't update partner category # ${id}. Error: ${error.message}`,
      );
    }
  }
}

export async function deletePartnerCategory(id) {
  try {
    const res = await axiosInstance.delete(
      `${API_URL}/partner-categories/${id}`,
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(
          `Cette catégorie est utilisée par au moins 1 partenaire.`,
        );
      throw new Error(
        `Couldn't delete partner category # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete partner category # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't delete partner category # ${id}. Error: ${error.message}`,
      );
    }
  }
}
