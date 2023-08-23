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

// お気に入りから削除する関数
export const removeFromFavorites = async (postId) => {
  try {
    const response = await fetch(`http://localhost:4000/favorites/${postId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      // toast.success("Removed from your favorites"); // 成功メッセージをtoastで表示
      // setIsFavorite(false); // 成功した場合のみisFavoriteを更新
    } else {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
    // toast.error("Failed to remove from favorites");
  }
};
