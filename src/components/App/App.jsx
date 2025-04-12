import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../ModalWithForm/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getItems, deleteItem, addItem } from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { signup, signin, getUserData, editUserProfile } from "../../utils/auth";
import ChangeProfileModal from "../Profile/ChangeProfileModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import ClothesSection from "../Profile/ClothesSection";
import { addCardLikes, removeCardLikes } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ProtectedRoute from "../App/ProtectedRoute"; // import ProtectedRoute

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();

  // Handles the login modal trigger
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  // Handles the sign-up modal trigger
  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  // Opens delete confirmation modal
  const handleDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setActiveModal("delete-confirmation");
  };

  // Toggles temperature unit between Fahrenheit and Celsius
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Handles adding new item if logged in
  const handleAddClick = () => {
    if (!isLoggedIn) {
      console.error("User is not logged in. Please log in first.");
      setIsLoginModalOpen(true);
      return;
    }
    setActiveModal("add-garment");
  };

  // Closes the active modal and resets selectedCard and itemToDelete
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setItemToDelete(null);
  };

  // Handles the editing of the user profile
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  // Handles selecting an item card to preview
  const handleCardClick = (card) => {
    if (!card?._id) {
      console.error("Selected card is missing _id", card);
      return;
    }
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Deletes the selected item
  const handleDeleteItem = async () => {
    if (!itemToDelete?._id) {
      return;
    }

    try {
      await deleteItem(itemToDelete._id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemToDelete._id)
      );
      closeActiveModal();
      setItemToDelete(null);
      setSelectedCard(null);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // Handles adding new item submission
  const handleAddItemSubmit = async (item) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    try {
      const newItem = await addItem(item);
      setClothingItems([newItem, ...clothingItems]);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  // Handles card like functionality
  const handleCardLikes = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    return isLiked
      ? addCardLikes(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLikes(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  // Fetches weather data and clothing items
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    const fetchItems = async () => {
      try {
        const items = await getItems();
        setClothingItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();

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

  // Handles user registration and login
  const handleRegister = (userData) => {
    console.log("Registering with data:", userData);
  
    signup(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          console.log("JWT saved to localStorage:", res.token);
          return signin({
            email: userData.email,
            password: userData.password,
            avatar: userData.avatarURL,
            name: userData.name,
          });
        }
        throw new Error("Registration failed - no token received.");
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          console.log("JWT saved to localStorage:", res.token);
          return getUserData(res.token);
        }
        throw new Error("Login failed - no token received.");
      })
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Registration or Login Error:", error);
      });
  };  

  const handleLogin = (credentials) => {
    signin(credentials)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          console.log("JWT saved to localStorage:", res.token);
          return getUserData(res.token);
        }
        throw new Error("Login failed");
      })
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
        navigate("/profile"); // Ensure navigation to profile or home after login
      })
      .catch(console.error);
  };

  // Handles user logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page after logout
  };

  // Handles the profile change click
  const handleChangeProfileClick = () => {
    setIsChangeProfileModalOpen(true);
  };

  // Handles user profile update
  const handleChangeProfile = async (updatedUserData) => {
    try {
      const updatedUser = await editUserProfile(updatedUserData);
      setCurrentUser(updatedUser);
      closeActiveModal();
    } catch (error) {
      console.error("Failed to update user profile", error);
    }
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page" style={{ fontFamily: "CabinetGrotesk" }}>
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              onLoginClick={handleLoginClick}
              onSignUpClick={handleSignUpClick}
            />
            <Routes>
              <Route
                path="/"
                element={<Main weatherData={weatherData} clothingItems={clothingItems} handleCardClick={handleCardClick} onCardLike={handleCardLikes} />}
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onEditProfileClick={handleEditProfileClick}
                      onDelete={handleDeleteConfirmation}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="/signin" element={<LoginModal onLogin={handleLogin} onClose={() => setIsLoginModalOpen(false)} onRegister={() => setIsSignUpModalOpen(true)} />} />
              <Route path="/signup" element={<SignUpModal onSignUp={handleRegister} onClose={() => setIsSignUpModalOpen(false)} />} />
            </Routes>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={closeActiveModal}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            activeModal={activeModal}
            item={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteConfirmation}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={closeActiveModal}
            onConfirm={handleDeleteItem}
            item={itemToDelete}
          />
          <ChangeProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onChangeProfile={handleChangeProfile}
          />
          {isLoginModalOpen && (
            <LoginModal
              isOpen={isLoginModalOpen}
              onLogin={handleLogin}
              onClose={() => setIsLoginModalOpen(false)}
              onRegister={() => {
                setIsLoginModalOpen(false);
                setIsSignUpModalOpen(true);
              }}
            />
          )}
          {isSignUpModalOpen && (
            <SignUpModal
              onSignUp={handleRegister}
              onClose={() => setIsSignUpModalOpen(false)}
            />
          )}
        </div>
        <Footer />
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;