import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SERVER_URL } from "../../Constants";
/**
 * Login function to authenticate a user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Object|null} User information if login is successful, otherwise null.
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/login`,
      { email, password },
      { withCredentials: true }
    );
    if (response.status === 200) {
      const userInfo = response.data;

      clearLocalStorage();
      saveToLocalStorage({ userInfo });
      toast.success("You are logged in!", {
        position: "top-center",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return userInfo;
    } else {
      toast.error("Login failed");
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 404:
          toast.error("User not found");
          break;
        case 401:
          toast.error("Incorrect password");
          break;
        default:
          toast.error("An error occurred during login");
          break;
      }
    } else {
      toast.error("An error occurred during login");
    }
    return null;
  }
};

/**
 * Clears user information from local storage.
 */
const clearLocalStorage = () => {
  localStorage.removeItem("userInfo");
};
/**
 * Saves user information to local storage.
 * @param {Object} data - Data to be saved to local storage.
 */
const saveToLocalStorage = (data) => {
  localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
};
