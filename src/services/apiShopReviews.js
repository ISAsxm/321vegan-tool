import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

export async function countShopReviews(filters) {
  try {
    const params = new URLSearchParams();
    // FILTER
    if (filters) {
      filters.map((f) => params.append(f.field, f.value));
    }
    const res = await axiosInstance.get(
      [`${API_URL}/shop-reviews/count`, params.toString()]
        .filter(Boolean)
        .join("?"),
    );
    const data = res.data;
    return data.total;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load shop reviews count. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load shop reviews count. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't load shop reviews count. Error: ${error.message}`,
      );
    }
  }
}

export async function getShopReviews() {
  try {
    const res = await axiosInstance.get(`${API_URL}/shop-reviews/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load shop reviews. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load shop reviews. Request error: ${error.request}`,
      );
    } else {
      throw new Error(`Couldn't load shop reviews. Error: ${error.message}`);
    }
  }
}

export async function getSearchShopReviews({ filters, sortBy, page, size }) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/shop-reviews/search`, params].filter(Boolean).join("?"),
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched shop reviews. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched shop reviews. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't load searched shop reviews. Error: ${error.message}`,
      );
    }
  }
}

export async function updateShopReviewStatus(id, status) {
  console.log(id, status);
  try {
    const res = await axiosInstance.patch(
      `${API_URL}/shop-reviews/${id}/status`,
      { status: status },
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update shop review # ${id} status. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update shop review # ${id} status. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't update shop review # ${id} status. Error: ${error.message}`,
      );
    }
  }
}

export async function deleteShopReview(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/shop-reviews/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete shop review # ${id}. Response status: ${error.response.status}`,
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete shop review # ${id}. Request error: ${error.request}`,
      );
    } else {
      throw new Error(
        `Couldn't delete shop review # ${id}. Error: ${error.message}`,
      );
    }
  }
}
