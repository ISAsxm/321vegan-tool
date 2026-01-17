import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

export async function getHouseholdCleaners() {
  try {
    const res = await axiosInstance.get(`${API_URL}/household-cleaners/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load household cleaners. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load household cleaners. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't load household cleaners. Error: ${error.message}`,
      );
    }
  }
}

export async function getSearchHouseholdCleaners({
  filters,
  sortBy,
  page,
  size,
}) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/household-cleaners/search`, params]
        .filter(Boolean)
        .join("?"),
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched household cleaners. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched household cleaners. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't load searched household cleaners. Error: ${error.message}`,
      );
    }
  }
}

export async function getHouseholdCleaner(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/household-cleaners/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find household cleaners #${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find household cleaners #${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't find household cleaners #${id}. Error: ${error.message}`,
      );
    }
  }
}

export async function createHouseholdCleaner(householdCleaner) {
  try {
    const res = await axiosInstance.post(
      `${API_URL}/household-cleaners/`,
      householdCleaner,
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Cette marque de produit de nettoyage existe déjà.`);
      throw new Error(
        `Couldn't create household cleaner. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create household cleaner. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't create household cleaner. Error: ${error.message}`,
      );
    }
  }
}

export async function updateHouseholdCleaner(id, householdCleaner) {
  try {
    const res = await axiosInstance.put(
      `${API_URL}/household-cleaners/${id}`,
      householdCleaner,
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      if (error.response.status === 409)
        throw new Error(`Cette marque de produit de nettoyage existe déjà.`);
      throw new Error(
        `Couldn't update household cleaner # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update household cleaner # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't update household cleaner # ${id}. Error: ${error.message}`,
      );
    }
  }
}

export async function deleteHouseholdCleaner(id) {
  try {
    const res = await axiosInstance.delete(
      `${API_URL}/household-cleaners/${id}`,
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete household cleaner # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete household cleaner # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't delete household cleaner # ${id}. Error: ${error.message}`,
      );
    }
  }
}
