const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return res.json();
}

export function request(url, options = {}) {
  
  return fetch(url, options).then(checkResponse);
}

export const getItems = () => {
  return request(`${baseUrl}/items`);
};

export const addItem = (item) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Authentication required");
  }

  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
};

export const deleteItem = (id) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Authentication required");
  }

  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

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

export const addCardLikes = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLikes = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};