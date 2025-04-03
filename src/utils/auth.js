const BASE_URL = "http://localhost:3001"; 

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/auth/signup`, {  // ✅ Corrected path
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          throw new Error(data.message || "Registration failed"); 
        });
      }
    })
    .catch((err) => {
      console.error("Registration error: ", err);
      throw err;
    });
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/auth/signin`, {  // ✅ Corrected path
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          throw new Error(data.message || "Login failed"); 
        });
      }
    })
    .catch((err) => {
      console.error("Login error: ", err);
      throw err;
    });
};

export const getUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          throw new Error(data.message || "Failed to fetch user data");
        });
      }
    })
    .catch((err) => {
      console.error("Error fetching user data: ", err);
      throw err;
    });
};
