import { request } from "./api";

const baseUrl = process.env.NODE_ENV === "production"
  ? "https://api.keithswtwr.myserver.dns.com.crabdance.com"
  : "http://localhost:3001";

export const signup = (userData) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const signin = (credentials) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

export const getUserData = (token) => {
  if (!token) {
    throw new Error("No token found");
  }

  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const editUserProfile = (updatedUserData) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("No token found");
  }

  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUserData),
  });
};