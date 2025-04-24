// src/components/App/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  signin,
  signup,
  getUserData,
  getItems,
  addItem,
  deleteItem,
  addCardLikes,
  removeCardLikes,
  editUserProfile,
} from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProtectedRoute from "./ProtectedRoute";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import AddItemModal from "../ModalWithForm/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ChangeProfileModal from "../Profile/ChangeProfileModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setItemToDelete(null);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openModal("preview");
  };

  const handleDeleteRequest = (item) => {
    setItemToDelete(item);
    openModal("delete-confirmation");
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete?._id) return;
    try {
      await deleteItem(itemToDelete._id);
      setClothingItems((prev) => prev.filter((i) => i._id !== itemToDelete._id));
      closeModal();
      toast.success("Garment deleted successfully!");
    } catch (err) {
      console.error("Failed to delete item:", err);
      toast.error("Failed to delete garment.");
    }
  };

  const handleAddItemSubmit = async (item) => {
    try {
      const newItem = await addItem(item);
      setClothingItems((prev) => [newItem, ...prev]);
      closeModal();
      toast.success("Garment added successfully!");
    } catch (err) {
      console.error("Failed to add item:", err);
      toast.error("Failed to add garment.");
    }
  };

  const handleCardLikes = ({ id, isLiked }) => {
    const likeAction = isLiked ? addCardLikes : removeCardLikes;
    return likeAction(id)
      .then((updatedCard) => {
        setClothingItems((prev) =>
          prev.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  const handleRegister = (userData) => {
    signup(userData)
      .then(() => signin({ email: userData.email, password: userData.password }))
      .then(() => getUserData())
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeModal();
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Registration/Login failed:", err);
        toast.error("Registration/Login failed.");
      });
  };

  const handleLogin = (credentials) => {
    signin(credentials)
      .then(() => getUserData())
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeModal();
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
    toast.success("Logged out successfully.");
  };

  const handleChangeProfile = (updatedData) => {
    editUserProfile(updatedData)
      .then(getUserData)
      .then((user) => {
        setCurrentUser(user);
        closeModal();
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
        toast.error("Failed to update profile.");
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Invalid token:", err);
          localStorage.removeItem("jwt");
          setCurrentUser(null);
          setIsLoggedIn(false);
        });
    }

    getItems().then(setClothingItems).catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleAddClick={() => openModal(isLoggedIn ? "add-garment" : "login")}
              onLoginClick={() => openModal("login")}
              onSignUpClick={() => openModal("signup")}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLikes}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={() => openModal("add-garment")}
                      onEditProfileClick={() => openModal("edit-profile")}
                      onDelete={handleDeleteRequest}
                      onCardLike={handleCardLikes}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <AddItemModal isOpen={activeModal === "add-garment"} onAddItem={handleAddItemSubmit} onCloseModal={closeModal} />
            <ItemModal isOpen={activeModal === "preview"} item={selectedCard} onClose={closeModal} onDelete={() => handleDeleteRequest(selectedCard)} />
            <DeleteConfirmationModal isOpen={activeModal === "delete-confirmation"} onClose={closeModal} onConfirm={handleDeleteItem} item={itemToDelete} />
            <ChangeProfileModal isOpen={activeModal === "edit-profile"} onClose={closeModal} onChangeProfile={handleChangeProfile} />
            {activeModal === "login" && <LoginModal isOpen={true} onLogin={handleLogin} onClose={closeModal} onRegister={() => openModal("signup")} />}
            {activeModal === "signup" && <SignUpModal isOpen={true} onSignUp={handleRegister} onClose={closeModal} onLogin={() => openModal("login")} />}
            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;