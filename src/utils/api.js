const BASE_URL = "http://localhost:3001"; 

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

const fetchWithAuth = (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: getHeaders(),
    credentials: "include", 
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error ${res.status}: ${res.statusText}`);
    }
    return res.json();
  });
};

export const getClothingItems = () => fetchWithAuth(`${BASE_URL}/items`);

export const likeItem = (itemId) =>
  fetchWithAuth(`${BASE_URL}/items/${itemId}/likes`, { method: "PUT" });

export const unlikeItem = (itemId) =>
  fetchWithAuth(`${BASE_URL}/items/${itemId}/likes`, { method: "DELETE" });
