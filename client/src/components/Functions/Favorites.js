import React from "react";

// fetchFavorites.js
export const fetchFavorites = async (email) => {
  try {
    const response = await fetch("http://localhost:4000/favorites", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return null;
  }
};
