import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { register, login, getUserData } from "../../utils/auth";
import { getClothingItems, likeItem, unlikeItem } from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import ClothesSection from "../ClothesSection/ClothesSection";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false); 
  const [clothingItems, setClothingItems] = useState([]);
  const [error, setError] = useState(null); 
  const [isRegistering, setIsRegistering] = useState(false); 

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const handleRegister = (formData) => {
    setIsRegistering(true); 
    register(formData)
      .then(() => handleLogin({ email: formData.email, password: formData.password }))
      .catch((err) => {
        setError("Registration failed. Please try again.");
        setIsRegistering(false);
      });
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
      .catch((err) => {
        setError("Login failed. Please check your credentials.");
        console.error("Login error:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleCardLike = (item) => {
    const isLiked = item.likes.includes(currentUser?._id);
    const likeAction = isLiked ? unlikeItem : likeItem;

    likeAction(item._id)
      .then((updatedItem) => {
        setClothingItems((prevItems) =>
          prevItems.map((i) => (i._id === updatedItem._id ? updatedItem : i))
        );
      })
      .catch((err) => console.error("Like/unlike error:", err));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleProfileUpdate = (updatedUser) => {
    setCurrentUser(updatedUser); 
    setIsEditProfileOpen(false); 
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <div className="App">
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

          <main>
            <Routes>
              <Route path="/" element={<ClothesSection clothingItems={clothingItems} onCardLike={handleCardLike} />} />
              
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile onEditProfile={() => setIsEditProfileOpen(true)} />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />

          {/* Modals */}
          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            onRegister={handleRegister}
            isRegistering={isRegistering} 
            error={error} 
          />
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onLogin={handleLogin}
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            currentUser={currentUser}
            onClose={() => setIsEditProfileOpen(false)}
            onUpdate={handleProfileUpdate} 
          />

          {/* Auth buttons (only if not logged in) */}
          {!isLoggedIn && (
            <div className="auth-buttons">
              <button onClick={() => setIsRegisterOpen(true)}>Sign Up</button>
              <button onClick={() => setIsLoginOpen(true)}>Login</button>
            </div>
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
