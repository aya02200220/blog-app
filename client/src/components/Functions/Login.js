import React from "react";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalStorage, LocalStorageRemove } from "./LocalStorage";

export const login = async (email, password) => {
  const notify = () => toast("Wow so easy!");

  try {
    const data = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (data.status === 200) {
      const userInfo = await data.json();
      LocalStorageRemove();
      console.log("Login userInfo:", userInfo);
      LocalStorage({ userInfo: userInfo });

      toast.success("You are logged in!");
      return userInfo;
    } else {
      toast.error("Login failed");
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    toast.error("An error occurred during login");
    return null;
  }
};
