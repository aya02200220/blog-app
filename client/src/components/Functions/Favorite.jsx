import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import IconButton from "@material-ui/core/IconButton";
import Box from "@mui/material/Box";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const Favorite = ({ favorite, userName, userId, _id }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleFavoriteClick = (postId) => {
    console.log(postId);
    console.log(userName);
    console.log(userId);
    console.log(_id);

    if (!userName) {
      toast.error("You need to login to bookmark!");
      return;
    }

    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      addToFavorites(postId);
    } else {
      removeFromFavorites(postId);
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

  // const addToFavorites = async (postId) => {
  //   try {
  //     // 重複をチェック
  //     if (favorite.includes(postId)) {
  //       toast.error("This post is already in your favorites");
  //       return;
  //     }

  //     const response = await fetch("http://localhost:4000/favorites", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ postId: postId }),
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       console.log("内容確認：");
  //       toast.success("Added to your favorites");
  //       // 追加した場合、isFavoriteを更新して重複を防ぐ
  //       setIsFavorite(true);
  //     } else {
  //       const data = await response.json();
  //       throw new Error(data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to add to favorites");
  //   }
  // };

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
      <Box
        size="small"
        onClick={(e) => {
          e.preventDefault();
          handleFavoriteClick(_id);
        }}
      >
        {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </Box>
    </>
  );
};
