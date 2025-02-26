const baseUrl = "http://localhost:3000";

function checkRes(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkRes);
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkRes);
}

function deleteItem(cardToDelete) {
  return fetch(`${baseUrl}/items/${cardToDelete}`, {
    method: "DELETE",
  }).then(checkRes);
}

export { checkRes, getItems, addItem, deleteItem };