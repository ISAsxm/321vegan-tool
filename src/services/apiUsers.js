import { buildURLSearchParams } from "@/utils/helpers";
import { API_URL } from "@/utils/constants";
import axiosInstance from "./axiosInstance";

export async function getUsers() {
  try {
    const res = await axiosInstance.get(`${API_URL}/users`);
    const data = await res.data;
    return { data: data, count: data?.length };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load users. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(`Couldn't load users. Request error: ${error.request}`);
    } else {
      throw new Error(`Couldn't load users. Error: ${error.message}`);
    }
  }
}

export async function getSearchUsers({ filters, sortBy, page, size }) {
  try {
    const params = buildURLSearchParams(filters, sortBy, page, size);
    const res = await axiosInstance.get(
      [`${API_URL}/users/search`, params].filter(Boolean).join("?")
    );
    const data = await res.data;
    return { data: data.items, count: data.total };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't load searched users. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't load searched users. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't load searched users. Error: ${error.message}`);
    }
  }
}

export async function getUser(id) {
  try {
    const res = await axiosInstance.get(`${API_URL}/users/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find user #${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find user #${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't find user #${id}. Error: ${error.message}`);
    }
  }
}

export async function createUser(user) {
  try {
    const res = await axiosInstance.post(`${API_URL}/users`, user);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't create user. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(`Couldn't create user. Request error: ${error.request}`);
    } else {
      throw new Error(`Couldn't create user. Error: ${error.message}`);
    }
  }
}

export async function updateUser(id, user) {
  try {
    const res = await axiosInstance.put(`${API_URL}/users/${id}`, user);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update user # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update user # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't update user # ${id}. Error: ${error.message}`);
    }
  }
}

export async function deleteUser(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/users/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete user # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete user # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't delete user # ${id}. Error: ${error.message}`);
    }
  }
}
