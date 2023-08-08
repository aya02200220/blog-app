import React from "react";
import toast from "react-hot-toast";
import { LocalStorage, LocalStorageRemove } from "./LocalStorage";

// export const login = async (email, password) => {
//   // e.preventDefault();

//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");

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
//       // setUserInfo(userInfo);

//       toast.success("You are logged in!");
//       // ログインが成功した場合、ホームページにリダイレクト
//       // setRedirect(true);
//     } else {
//       toast.error("Login failed");
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     toast.error("An error occurred during login");
//   }
//   return;

export const login = async (email, password) => {
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
