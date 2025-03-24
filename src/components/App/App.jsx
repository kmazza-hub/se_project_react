import React, { useState, useEffect } from "react";
import { register, login, getUserData } from "../../utils/auth";
import { getClothingItems, likeItem, unlikeItem } from "../../utils/api"; // Import API functions
import CurrentUserContext from "../../contexts/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import ClothesSection from "../ClothesSection/ClothesSection";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }

    getClothingItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRegister = (formData) => {
    register(formData)
      .then(() => handleLogin({ email: formData.email, password: formData.password }))
      .catch((err) => console.log(err));
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getUserData(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setIsLoginOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleCardLike = (item) => {
    const isLiked = item.likes.includes(currentUser._id);

    const likeAction = isLiked ? unlikeItem : likeItem;

    likeAction(item._id)
      .then((updatedItem) => {
        setClothingItems((prevItems) =>
          prevItems.map((i) => (i._id === updatedItem._id ? updatedItem : i))
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {!isLoggedIn ? (
          <>
            <button onClick={() => setIsRegisterOpen(true)}>Sign Up</button>
            <button onClick={() => setIsLoginOpen(true)}>Login</button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}

        <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onRegister={handleRegister} />
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />

        <ProtectedRoute
          path="/profile"
          isLoggedIn={isLoggedIn}
          component={Profile}
        />

        {/* Pass handleCardLike to ClothesSection */}
        <ClothesSection
          clothingItems={clothingItems}
          onCardLike={handleCardLike}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
