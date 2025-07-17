import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

export async function countErrorReports(filters) {
  try {
    const params = new URLSearchParams();
    // FILTER
    if (filters) {
      filters.map((f) => params.append(f.field, f.value));
    }
    const res = await axiosInstance.get(
      [`${API_URL}/error-reports/count`, params.toString()]
        .filter(Boolean)
        .join("?")
    );
    const data = res.data;
    return data.total;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load error reports count. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load error reports count. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load error reports count. Error: ${error.message}`
      );
    }
  }
}

export async function getErrorReports() {
  try {
    const res = await axiosInstance.get(`${API_URL}/error-reports/`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load error reports. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load error reports. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load error reports. Error: ${error.message}`);
    }
  }
}

export async function getSearchErrorReports({ filters, sortBy, page, size }) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/error-reports/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched error reports. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched error reports. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't load searched error reports. Error: ${error.message}`
      );
    }
  }
}

export async function updateErrorReport(id, errorReport) {
  try {
    const res = await axiosInstance.put(
      `${API_URL}/error-reports/${id}`,
      errorReport
    );
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update error report # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update error report # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't update error report # ${id}. Error: ${error.message}`
      );
    }
  }
}
