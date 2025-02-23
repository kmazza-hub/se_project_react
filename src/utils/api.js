// Define the base URL for the API
const baseUrl = "http://localhost:3001";

// Function to check the response from the API and handle errors
function checkRes(res) {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((errorData) => {
      // Include the response body if the status is not OK
      return Promise.reject(`Error: ${res.status} - ${errorData.message || 'Unknown error'}`);
    });
  }
}

// Function to get the list of items from the API
function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkRes)
    .catch((error) => {
      console.error('Error fetching items:', error);
      return []; // Return an empty array or another default value
    });
}

// Function to add a new item to the API
function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then(checkRes)
    .catch((error) => {
      console.error('Error adding item:', error);
      return null; // Handle errors related to item creation
    });
}

// Function to delete an item from the API by its ID
function deleteCard(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
  })
    .then(checkRes)
    .catch((error) => {
      console.error('Error deleting item:', error);
      return null; // Handle errors related to item deletion
    });
}

export { checkRes, addItem, getItems, deleteCard };
