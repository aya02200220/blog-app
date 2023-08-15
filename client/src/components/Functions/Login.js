// import React from "react";
// import axios from "axios";

// // import toast from "react-hot-toast";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { LocalStorage, LocalStorageRemove } from "./LocalStorage";

// export const login = async (email, password) => {
//   const notify = () => toast("Wow so easy!");

//   try {
//     const data = await fetch("http://localhost:4000/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//     });

//     if (data.status === 200) {
//       const userInfo = await data.json();
//       LocalStorageRemove();
//       console.log("Login userInfo:", userInfo);
//       LocalStorage({ userInfo: userInfo });

//       toast.success("You are logged in!");
//       return userInfo;
//     } else {
//       toast.error("Login failed");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     toast.error("An error occurred during login");
//     return null;
//   }
// };

// export const login = async (email, password) => {
//   try {
//     const data = await axios.post(
//       "http://localhost:4000/login",
//       {
//         email,
//         password,
//       },
//       {
//         withCredentials: true,
//       }
//     );
//     if (data.status === 200) {
//       const userInfo = await data.json();
//       LocalStorageRemove();
//       console.log("Login userInfo:", userInfo);
//       LocalStorage({ userInfo: userInfo });

//       toast.success("You are logged in!");
//       return userInfo;
//     } else {
//       toast.error("Login failed");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     toast.error("An error occurred during login");
//     return null;
//   }
// };

// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
/**
 * Login function to authenticate a user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Object|null} User information if login is successful, otherwise null.
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/login",
      { email, password },
      { withCredentials: true }
    );
    if (response.status === 200) {
      const userInfo = response.data;
      clearLocalStorage();
      saveToLocalStorage({ userInfo });
      toast.success("You are logged in!");
      return userInfo;
    } else {
      toast.error("Login failed");
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    toast.error("An error occurred during login");
    return null;
  }
};
/**
 * Clears user information from local storage.
 */
const clearLocalStorage = () => {
  // Assuming you have a specific key for user info in local storage
  localStorage.removeItem("userInfo");
};
/**
 * Saves user information to local storage.
 * @param {Object} data - Data to be saved to local storage.
 */
const saveToLocalStorage = (data) => {
  // Assuming you have a specific key for user info in local storage
  localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
};
