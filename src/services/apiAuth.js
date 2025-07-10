import { API_URL } from "@/utils/constants";
import axios from "axios";
import axiosInstance from "./axiosInstance";

export async function login({ email, password }) {
  try {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    const res = await axios.post(`${API_URL}/auth/login`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true, // Required for refresh_token HttpOnly
    });
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Couldn't log in. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(`Couldn't log in. Request error: ${error.request}`);
    } else {
      throw new Error(`Couldn't log in. Error: ${error.message}`);
    }
  }
}

export async function logout() {
  try {
    const res = await axiosInstance.get(`${API_URL}/auth/logout`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't log out. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(`Couldn't log out. Request error: ${error.request}`);
    } else {
      throw new Error(`Couldn't log out. Error: ${error.message}`);
    }
  }
}

export async function getCurrentUser() {
  try {
    const res = await axiosInstance.get(`${API_URL}/me`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't find current user. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't find current user. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't find current user. Error: ${error.message}`);
    }
  }
}

export async function updateCurrentUser({ id, password, nickname, avatar }) {
  // 1. Update password OR nickname
  let updateData;
  if (password) updateData = { password: password };
  if (nickname) updateData = { nickname: nickname };
  try {
    const res = await axiosInstance.put(`${API_URL}/me`, updateData);
    const data = await res.data;

    return data;
    // uncomment when there is a storage solution for files
    // if (!avatar) return data;
    // // 2. Upload avatar image
    // const fileName = `avatar-${id}-${Math.random()}`;
    // TODO upload file in bucket
    // console.log(fileName);
    // // 3. Update avatar in the user
    // updateData = { avatar: fileName };
    // const res2 = await axios.put(`${API_URL}/me`, updateData);
    // const data2 = await res2.data;
    // return data2;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) throw error;
      throw new Error(
        `Couldn't update current user. Response status: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error(
        `Couldn't update current user. Request error: ${error.request}`
      );
    } else {
      throw new Error(`Couldn't update current user. Error: ${error.message}`);
    }
  }
}
