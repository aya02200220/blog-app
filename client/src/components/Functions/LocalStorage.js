import React from "react";

/////////////////////////////////////////////////////////////////////
export const LocalStorage = (props) => {
  console.log("Set Local Storage");
  localStorage.setItem("userInfo", JSON.stringify(props.userInfo));
  return;
};
/////////////////////////////////////////////////////////////////////
export const LocalStorageRemove = () => {
  console.log("Remove Local Storage");
  localStorage.removeItem("userInfo");
  return;
};
/////////////////////////////////////////////////////////////////////
export function GetLocalStorage() {
  console.log("Get Local Storage Data");
  const userInfoString = localStorage.getItem("userInfo");
  if (userInfoString === "undefined") {
    LocalStorageRemove();
    return null;
  }
  if (userInfoString) {
    return JSON.parse(userInfoString);
  }
  return null;
}
