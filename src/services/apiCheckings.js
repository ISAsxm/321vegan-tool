import { API_URL } from "@/utils/constants";
import axiosInstance from "./axiosInstance";

export async function createChecking(checking) {
  try {
    const res = await axiosInstance.post(`${API_URL}/checkings/`, checking);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't create checking. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't create checking. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't create checking. Error: ${error.message}`);
    }
  }
}

export async function updateChecking(id, checking) {
  try {
    const res = await axiosInstance.put(`${API_URL}/checkings/${id}`, checking);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update checking # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update checking # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't update checking # ${id}. Error: ${error.message}`
      );
    }
  }
}

export async function deleteChecking(id) {
  try {
    const res = await axiosInstance.delete(`${API_URL}/checkings/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't delete checking # ${id}. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't delete checking # ${id}. Request error: ${error.request}`
      );
    } else {
      throw new Error(
        `Couldn't delete checking # ${id}. Error: ${error.message}`
      );
    }
  }
}
