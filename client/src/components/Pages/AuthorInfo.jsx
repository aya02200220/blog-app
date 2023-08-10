import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Favorite } from "../Functions/Favorite";
import { fetchFavorites } from "../Functions/Favorites";

import { Box, Avatar, Typography, IconButton, Skeleton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { Link } from "react-router-dom";

export const AuthorInfo = ({
  postInfo,
  favorite,
  userName,
  userId,
  _id,
  commentUpdated,
  loginUser,
  onComplete,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [getPostInfo, setGetPostInfo] = useState(null);
  const [isFavorite, setIsFavorite] = useState();
  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const favoriteCount = postInfo?.favorites.length;

  console.log("AuthorInfo --------------------------------");

  // console.log("postInfo Author :", postInfo);
  // console.log("postInfo loginUser :", loginUser);

  const handleGrandChildComplete = () => {
    if (onComplete) {
      // console.log(
      //   "孫コンポーネントのレンダリングが終わったので、親へのcallbackを実行"
      // );
      setIsRendered(true);
      onComplete();
    }
  };

  useEffect(() => {
    setComments(postInfo?.comments);
  }, [postInfo]);

  const postID = postInfo?._id;

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  // ポスト投稿者の情報を取得---------------------------------------
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

  // Comments update---------------------------------------
  useEffect(() => {
    // console.log("-------comment up date-----------");
    if (postID) {
      fetch(`http://localhost:4000/post/${postID}`)
        .then((res) => res.json())
        .then((fetchedPostInfo) => {
          setGetPostInfo(fetchedPostInfo);
          setComments(fetchedPostInfo.comments);
        })
        .catch((error) => {
          console.error("Error fetching post info:", error);
        });
    }
  }, [commentUpdated]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      if (userInfo.email && postID) {
        const favoritesData = await fetchFavorites(userInfo.email);
        if (favoritesData) {
          const isIdFavorite = favoritesData.some(
            (post) => post._id === postID
          );
          setIsFavorite(isIdFavorite);
          console.log("Favorite Data:", favoritesData);
          console.log("Fav postID:", postID);
          console.log("Favorite ????:", isIdFavorite);
        }
      }
    };
    fetchData();
    if (postInfo?.author._id) fetchAuthorInfo();
  }, [postInfo?.author._id]);

  useEffect(() => {
    setLoading(false);
  }, [isFavorite]);

  // const { firstName, lastName, followers, userIcon } = authorInfo;
  let firstName, lastName, followers, userIcon;
  if (authorInfo) {
    ({ firstName, lastName, followers, userIcon } = authorInfo);
  }

  if (!authorInfo) return <AuthorInfoFalse />;
  if (loading) return <AuthorInfoFalse />;

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
              {firstName && lastName && userIcon ? (
                <Avatar
                  {...stringAvatar(`${firstName} ${lastName}`)}
                  src={userIcon}
                  sx={{ width: 80, height: 80 }}
                />
              ) : (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              )}
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
                {firstName && lastName ? (
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                      lineHeight: "12px",
                    }}
                  >
                    {firstName} {lastName}
                  </Typography>
                ) : (
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                )}
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
                Follower: {followers ? followers : "0"}
              </Typography>
            </Box>

            <IconButton size="small" sx={{ mt: 1, borderRadius: 1.5 }}>
              {!isFollowing ? (
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

            <Box
              sx={{
                mt: 1,
                display: "flex",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <IconButton
                size="small"
                sx={{ borderRadius: 1.5, width: "50px" }}
                onClick={() => {
                  // 指定したIDまでスムーズにスクロール
                  document
                    .getElementById("comments-section")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ChatBubbleOutlineIcon />
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      ml: 0.5,
                      mb: 0.5,
                    }}
                  >
                    {comments ? comments.length : 0}
                  </Typography>
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
                    onComplete={handleGrandChildComplete}
                    favorite={isFavorite}
                    userName={loginUser.email}
                    userId={loginUser.id}
                    _id={postID}
                    // _id={_id}
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

export const AuthorInfoFalse = () => {
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
};
