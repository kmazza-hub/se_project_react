// src/components/App/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../ModalWithForm/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import ChangeProfileModal from "../Profile/ChangeProfileModal";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../App/ProtectedRoute";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem, addCardLikes, removeCardLikes } from "../../utils/api";
import { signup, signin, getUserData, editUserProfile } from "../../utils/auth";

import { Toaster, toast } from "react-hot-toast"; // <--- ADD TOASTS

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

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

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

  const handleDeleteConfirmation = (item) => {
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
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No token found.");
      return;
    }
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
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No token found.");
      return;
    }
    const likeAction = isLiked ? addCardLikes : removeCardLikes;
    return likeAction(id, token)
      .then((updatedCard) => {
        setClothingItems((prev) =>
          prev.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  const handleRegister = (userData) => {
    signup(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return signin({
            email: userData.email,
            password: userData.password,
          });
        }
        throw new Error("Registration failed");
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return getUserData(res.token);
        }
        throw new Error("Login failed");
      })
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        closeModal();
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Registration/Login failed.");
      });
  };

  const handleLogin = (credentials) => {
    signin(credentials)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return getUserData(res.token);
        }
        throw new Error("Login failed");
      })
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        navigate("/profile");
        closeModal();
      })
      .catch((err) => {
        console.error(err);
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

  const handleChangeProfile = async (updatedData) => {
    try {
      const updatedUser = await editUserProfile(updatedData);
      setCurrentUser(updatedUser);
      closeModal();
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update user profile", err);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then(setClothingItems)
      .catch(console.error);

    const token = localStorage.getItem("jwt");
    if (token) {
      getUserData(token)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Toaster position="top-center" reverseOrder={false} /> {/* Toast Popups */}
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
                      onDelete={handleDeleteConfirmation}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}
              onCloseModal={closeModal}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              item={selectedCard}
              onClose={closeModal}
              onDelete={handleDeleteConfirmation}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "delete-confirmation"}
              onClose={closeModal}
              onConfirm={handleDeleteItem}
              item={itemToDelete}
            />
            <ChangeProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeModal}
              onChangeProfile={handleChangeProfile}
            />
            {activeModal === "login" && (
              <LoginModal
                isOpen={true}
                onLogin={handleLogin}
                onClose={closeModal}
                onRegister={() => openModal("signup")}
              />
            )}
            {activeModal === "signup" && (
              <SignUpModal
                onSignUp={handleRegister}
                onClose={closeModal}
                onLogin={() => openModal("login")}
              />
            )}
            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
