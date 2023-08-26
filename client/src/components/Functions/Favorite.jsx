import { useState, useEffect } from "react";
import { SERVER_URL } from "../../Constants";

import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const Favorite = ({ favorite, userName, userId, _id, onComplete }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  // console.log("favoriteコンポーネント:", favorite);
  // console.log("favoriteコンポーネントisFavorite:", isFavorite);

  useEffect(() => {
    if (onComplete) {
      // console.log("孫コンポーネントのレンダリングが終わりました");
      onComplete();
    }
  }, [onComplete]);

  const handleFavoriteClick = (postId) => {
    console.log("postId:", postId);
    console.log("userName:", userName);
    console.log("userId:", userId);
    console.log("Post_id:", _id);

    if (!userName) {
      toast.error("You need to login to bookmark!");
      return;
    }
    if (isFavorite) {
      removeFromFavorites(postId);
    } else {
      addToFavorites(postId);
    }
  };

  const addToFavorites = async (postId) => {
    try {
      // APIからの応答を受け取ってから状態を変更
      const response = await fetch(`${SERVER_URL}/favorites`, {
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
        setIsFavorite(true); // ここで更新
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
      const response = await fetch(`${SERVER_URL}/favorites/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Removed from your favorites"); // 成功メッセージをtoastで表示
        setIsFavorite(false); // 成功した場合のみisFavoriteを更新
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
