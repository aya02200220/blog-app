import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import IconButton from "@material-ui/core/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const Favorite = ({ favorite, userName, userId, _id }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleFavoriteClick = (postId) => {
    console.log(postId);
    console.log(userName);
    console.log(userId);

    if (!userName) {
      toast.error("You need to login to bookmark!");
      return;
    }

    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      addToFavorites(postId);
      // toast.success("Added to your favorites");
    } else {
      removeFromFavorites(postId);
      // toast.error("Removed from your favorites");
    }
  };

  const addToFavorites = async (postId) => {
    try {
      const response = await fetch("http://localhost:4000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: postId }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("内容確認：");
        toast.success("Added to your favorites");
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to favorites");
    }
  };

  // お気に入りから削除する関数
  const removeFromFavorites = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/favorites/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        toast.error("Removed from your favorites");
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove from favorites");
    }
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => {
          e.preventDefault();
          handleFavoriteClick(_id);
        }}
      >
        {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </>
  );
};
