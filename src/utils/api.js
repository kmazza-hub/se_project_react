const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.keithswtwr.myserver.dns.com.crabdance.com:3001"
    : "http://localhost:3001";


// ✅ Helper to check fetch responses
function checkResponse(res) {
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return res.json();
}

// ✅ Core fetch wrapper
export function request(url, options = {}) {
  return fetch(url, options).then(checkResponse);
}

// ✅ Get clothing items (token optional!)
export const getItems = () => {
  const token = localStorage.getItem("jwt");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return request(`${baseUrl}/items`, {
    method: "GET",
    headers,
  });
};

// ✅ Add an item (requires token)
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

// ✅ Delete an item (requires token)
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

// ✅ User signup
export const signup = (userData) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// ✅ User signin
export const signin = (credentials) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token); // ✅ Save token!
    }
    return data;
  });
};

// ✅ Add like to item
export const addCardLikes = (id) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("Authentication required");
  }

  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Remove like from item
export const removeCardLikes = (id) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("Authentication required");
  }

  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Get user info
export const getUserData = () => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("No token found");
  }

  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Edit user profile
export const editUserProfile = (updatedUserData) => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    throw new Error("No token found");
  }

  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUserData),
  });
};

export { checkResponse }; // ✅ Export helper if needed
