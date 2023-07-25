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

export const AddFiveComponent = (props) => {
  const result = props.number + 5;
  return result;
};
