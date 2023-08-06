import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Favorite } from "../Functions/Favorite";

import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  Divider,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MessageIcon from "@mui/icons-material/Message";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

import { Link } from "react-router-dom";

export const AuthorInfo = ({ postInfo, favorite, userName, userId, _id }) => {
  const [isFollowing, setIsFollowing] = useState("false");
  const [isBookMarked, setIsBookMarked] = useState("false");
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [authorInfo, setAuthorInfo] = useState(null); // 投稿者の情報を保持

  const [comments, setComments] = useState([]);
  const favoriteCount = postInfo?.favorite;

  // console.log("postInfo @ AuthorInfo:", postInfo);

  useEffect(() => {
    setComments(postInfo?.comments);
  }, [postInfo]);

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    // if (Object.keys(userInfo).length > 0) {
    //   console.log("userInfo true:", userInfo);
    //   fetch("http://localhost:4000/favorites", {
    //     credentials: "include",
    //   })
    //     .then((res) => res.json())
    //     .then((favorites) => {
    //       setFavorites(favorites);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching favorites:", error);
    //     });
    // } else {
    //   console.log("userInfo false:", userInfo);
    //   setFavorites("");
    // }

    // ポスト投稿者の情報を取得する関数
    const fetchAuthorInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/user/${postInfo.author._id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAuthorInfo(data); // 投稿者の情報をセット
      } catch (error) {
        console.error("Error fetching author info:", error);
      }
    };

    if (postInfo?.author._id) fetchAuthorInfo();
  }, [postInfo?.author._id]);

  if (!authorInfo) {
    return (
      <Box
        sx={{
          width: "200px",
          display: { xs: "none", sm: "flex", md: "flex" },
        }}
      >
        <Box
          sx={{
            border: "solid 3px #f0f0f0",
            height: "300px",
            width: "200px",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",

            borderRadius: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box
            sx={{
              border: "solid 3px #919aba",
              mt: 3,
              width: 90,
              height: 90,
              borderRadius: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton variant="circular" width={80} height={80} />
          </Box>

          <Box
            sx={{
              display: "flex",
              maxWidth: "180px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              mt: 2,
              color: "#757e9f",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                wordBreak: "break-word",
              }}
            >
              <Skeleton variant="text" width="120px" />
            </Box>

            <Box mt={2}>
              <Skeleton variant="text" width="120px" />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  const { firstName, lastName, followers, userIcon } = authorInfo;

  return (
    <>
      <Box
        sx={{
          width: "200px",
          display: { xs: "none", sm: "flex", md: "flex" },
        }}
      >
        <Box
          sx={{
            border: "solid 3px #f0f0f0",
            height: "300px",
            width: "200px",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",

            borderRadius: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box
            sx={{
              border: "solid 3px #919aba",
              mt: 3,
              width: 90,
              height: 90,
              borderRadius: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={`/`}>
              <Avatar
                {...stringAvatar(`${firstName} ${lastName}`)}
                src={userIcon}
                sx={{ width: 80, height: 80 }}
              />
            </Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              maxWidth: "180px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              mt: 2,
              color: "#757e9f",
            }}
          >
            <Link to={`/`}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  wordBreak: "break-word",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "12px",
                  }}
                >
                  {firstName} {lastName}
                </Typography>
              </Box>
            </Link>
            <Box mt={2}>
              <Typography
                sx={{
                  lineHeight: "10px",
                  wordBreak: "break-word",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Follower: {followers}
              </Typography>
            </Box>

            <IconButton size="small" sx={{ mt: 1, borderRadius: 1.5 }}>
              {isFollowing ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ControlPointIcon />
                  <Typography
                    sx={{
                      fontSize: "15px",
                      lineHeight: "12px",
                      fontWeight: "500",
                    }}
                  >
                    Follow
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex" }}>
                  <FileDownloadDoneIcon />
                  <Typography>Following</Typography>
                </Box>
              )}
            </IconButton>

            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                sx={{ borderRadius: 1.5, width: "50px" }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ChatBubbleOutlineIcon />
                  <Typography>{comments.length}</Typography>
                </Box>
              </IconButton>

              <IconButton
                size="small"
                sx={{ borderRadius: 1.5, width: "50px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Favorite
                    favorite={favorite}
                    userName={userName}
                    userId={userId}
                    _id={_id}
                  />
                  <Typography>{favoriteCount}</Typography>
                </Box>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
