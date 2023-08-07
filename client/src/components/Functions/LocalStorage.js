import React from "react";

export const LocalStorage = (props) => {
  console.log("Login props:", props);
  localStorage.setItem("userInfo", JSON.stringify(props.userInfo));
  return;
};
export const LocalStorageRemove = () => {
  console.log("remove props");
  localStorage.removeItem("userInfo");
  return;
};

export function GetLocalStorage() {
  console.log("Get Local Storage");

  const userInfoString = localStorage.getItem("userInfo");
  if (userInfoString) {
    return JSON.parse(userInfoString);
  }

  return null;
}
