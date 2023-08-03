import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Favorite } from "./Functions/Favorite";

import toast from "react-hot-toast";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import cx from "clsx";
import Box from "@material-ui/core/Box";
import Typography from "@mui/material/Typography";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "@material-ui/core/IconButton";
import Share from "@material-ui/icons/Share";

import { UserContext } from "./UserContext";

export const Post = React.memo(function PostCard({
  _id,
  title,
  cover,
  content,
  createdAt,
  author,
  favorite,
}) {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const { setUserInfo, userInfo } = useContext(UserContext);
  const userName = userInfo?.email;
  const userId = userInfo?.id;

  useEffect(() => {
    setIsFavorite(createdAt);
  }, [favorite]);

  // const handleFavoriteClick = (postId) => {
  //   console.log(postId);
  //   console.log(userName);
  //   console.log(userId);

  //   if (!userName) {
  //     toast.error("You need to login to bookmark!");
  //     return;
  //   }

  //   setIsFavorite(!isFavorite);
  //   if (!isFavorite) {
  //     addToFavorites(postId);
  //     // toast.success("Added to your favorites");
  //   } else {
  //     removeFromFavorites(postId);
  //     // toast.error("Removed from your favorites");
  //   }
  // };

  // const addToFavorites = async (postId) => {
  //   try {
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
  //     } else {
  //       const data = await response.json();
  //       throw new Error(data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to add to favorites");
  //   }
  // };

  // // お気に入りから削除する関数
  // const removeFromFavorites = async (postId) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/favorites/${postId}`,
  //       {
  //         method: "DELETE",
  //         credentials: "include",
  //       }
  //     );

  //     if (response.ok) {
  //       toast.error("Removed from your favorites");
  //     } else {
  //       const data = await response.json();
  //       throw new Error(data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to remove from favorites");
  //   }
  // };

  return (
    <>
      {/* _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
  favorite, */}
      <Box>
        <Link to={`/post/${_id}`}>
          <Box
            sx={{
              width: { xs: "300px", sm: "500px", md: "600px" },
              maxWidth: { xs: "300px", sm: "500px", md: "600px" },
              // border: "solid 1px black",
              borderBottom: "solid 1px #dedede",
              mb: 1,
            }}
          >
            {/* ///////////////////////////// カード上部コンテンツ */}
            <Box
              sx={{
                // maxWidth: "600px",
                display: "flex",
                flexDirection: {
                  xs: "column-reverse",
                  sm: "row",
                  med: "row",
                  lg: "row",
                },
                height: { xs: "100%", md: "172px" },
              }}
            >
              {/* ///////////////////////////// カード左半分コンテンツ */}
              <Box
                sx={{
                  width: { xs: "100%", sm: "100%", md: "55%" },
                  pr: { xs: "inherit", md: 2 },
                  ml: { xs: 1, sm: "0", md: "inherit" },
                  mr: { xs: 2, sm: "10px", md: "inherit" },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    pt: { xs: 1, md: "inherit" },
                    width: { xs: "90%", sm: "100%" },

                    fontSize: 20,
                    fontWeight: 5,
                    lineHeight: "23px",
                    minHeight: "60px",
                    maxHeight: "60x",

                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // 行数指定
                    overflow: "hidden",
                    textAlign: { xs: "center", sm: "inherit" },
                  }}
                >
                  {title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    color: "#8f8f8f",
                    mt: "5px",
                    justifyContent: { xs: "center", sm: "inherit" },
                  }}
                >
                  <Typography fontSize={"14px"}>
                    {/* {author?.firstName} {author?.lastName} */}
                    {author.firstName} {author.lastName}
                  </Typography>
                  <Typography fontSize={"14px"}>
                    {formatDistanceToNow(new Date(createdAt))} ago
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    mt: "5px",
                    color: "#6b6b6b",
                    fontSize: { xs: "18px", md: "20px" },
                    lineHeight: "21px",
                    minHeight: "63.3px",
                    maxHeight: "63.3px",
                    fontWeight: "300",

                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // 行数指定
                    overflow: "hidden",
                  }}
                  dangerouslySetInnerHTML={{ __html: content }}
                ></Typography>
              </Box>
              <Box
                component="img"
                src={`http://localhost:4000/${cover}`}
                sx={{
                  width: { xs: "100%", sm: "45%", md: "45%" },
                  minWidth: { xs: "100%", sm: "45%", md: "45%" },
                  maxWidth: { xs: "100%", sm: "45%", md: "45%" },
                  height: "170px",
                  minHeight: "170px",
                  maxHeight: "170px",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                m: 1,
                zIndex: "tooltip",
                display: "flex",
              }}
            >
              <IconButton size="small">
                <Share />
              </IconButton>

              {/* <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  handleFavoriteClick(_id);
                }}
              >
                {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton> */}
              <IconButton size="small">
                <Favorite
                  favorite={favorite}
                  userName={userName}
                  userId={userId}
                  _id={_id}
                />
              </IconButton>
            </Box>
          </Box>
        </Link>
      </Box>
    </>
  );
});

export default Post;
