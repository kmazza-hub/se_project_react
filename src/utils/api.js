const baseUrl = "http://localhost:3001";  // Fixed: Removed the trailing slash

// Helper function to check the response from fetch
function checkResponse(res) {
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return res.json();
}

// Function to handle fetch requests
export function request(url, options = {}) {
  return fetch(url, options).then(checkResponse);
}

// Get items from the server
export const getItems = () => {
  return request(`${baseUrl}/items`);  // Correctly points to /items
};

// Add an item to the server
export const addItem = (item) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Authentication required");
  }

  return request(`${baseUrl}/items`, {  // Correctly points to /items
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
};

// Delete an item from the server
export const deleteItem = (id) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    throw new Error("Authentication required");
  }

  return request(`${baseUrl}/items/${id}`, {  // Correctly points to /items/:id
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// User signup
export const signup = (userData) => {
  return request(`${baseUrl}/users/signup`, {  // Correctly points to /users/signup
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// User signin
export const signin = (credentials) => {
  return request(`${baseUrl}/users/signin`, {  // Correctly points to /users/signin
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

// Add a like to an item
export const addCardLikes = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {  // Correctly points to /items/:id/likes
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Remove a like from an item
export const removeCardLikes = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {  // Correctly points to /items/:id/likes
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get user data based on the token
export const getUserData = (token) => {
  if (!token) {
    throw new Error("No token found");
  }

  return request(`${baseUrl}/users/me`, {  // Correctly points to /users/me
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

// Edit the current user's profile
export const editUserProfile = (updatedUserData) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("No token found");
  }

  return request(`${baseUrl}/users/me`, {  // Correctly points to /users/me
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUserData),
  });
};
