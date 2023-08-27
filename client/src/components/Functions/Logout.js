// authHelpers.js
import { SERVER_URL } from "../../Constants";

// authHelpers.js

export async function logout(LocalStorageRemove, setUserInfo, navigate, toast) {
  const response = await fetch(`${SERVER_URL}/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (response.ok) {
    LocalStorageRemove();
    setUserInfo(null);

    navigate("/temp");
    setTimeout(() => navigate("/"), 0);

    toast.success("You are Signed out!", {
      position: "top-center",
      autoClose: 900,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else {
    toast.error("Logout failed!");
  }
}
