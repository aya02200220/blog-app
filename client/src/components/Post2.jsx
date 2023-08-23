/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { format, differenceInDays } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { Link } from "react-router-dom";
import { Favorite } from "./Functions/Favorite";
import { LoginIcon } from "./LoginIcon";
import { GetLocalStorage } from "./Functions/LocalStorage";

import cx from "clsx";
import { Box, IconButton, Button, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import Share from "@material-ui/icons/Share";

// import { UserContext } from "./UserContext";

export const Post = React.memo(function PostCard({
  _id = "1",
  title = "No title",
  cover = "No cover",
  content = "No content",
  createdAt,
  author = "No author",
  favorite = false,
  authorProfile,
}) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(favorite);

  useEffect(() => {
    const userInfo = GetLocalStorage();
    if (userInfo) {
      setUserName(userInfo.email);
      setUserId(userInfo.id);
    }
  }, []);
  // const { setUserInfo, userInfo } = useContext(UserContext);

  // 文字列として表現されるHTMLをDOMツリーに変換 //////////////////////////////
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  // DOMツリーから全ての<img>要素を取り除く
  const imgs = doc.getElementsByTagName("img");
  while (imgs.length > 0) {
    imgs[0].parentNode.removeChild(imgs[0]);
  }

  // DOMツリーから全てのスタイルを取り除く
  const styles = doc.querySelectorAll("*[style]");
  styles.forEach((style) => {
    style.removeAttribute("style");
  });

  // 最後に、操作されたDOMツリーを文字列に戻す
  const contentWithoutImgsOrStyles = doc.body.textContent || "";
  ////////////////////////////////////////////////////////////////

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  // Create at date format ////////////////////////////////////
  const formatDate = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const daysDifference = differenceInDays(currentDate, createdDate);

    if (daysDifference < 7) {
      // Less than a week ago
      return formatDistanceToNow(createdDate) + " ago";
    } else {
      // More than a week ago
      return format(createdDate, "MMM d, yyyy");
    }
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        {/* /////////// Author info /////////////// */}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            color: "#8f8f8f",
            mb: 1,
            justifyContent: { xs: "center", sm: "inherit" },
            position: "absolute",
            top: 12,
            left: 10,
            zIndex: 1,
          }}
        >
          <Link to={`/account`}>
            <IconButton
              size="large"
              edge="end"
              color="4e575f"
              sx={{
                p: 0,
                borderRadius: "50px 5px 5px 50px",
                m: 0,
                pr: 2,
                backgroundColor: alpha("#fff", 0.4),
              }}
            >
              <LoginIcon
                firstLetter={author?.firstName.charAt(0)}
                lastLetter={author?.lastName.charAt(0)}
                userIcon={authorProfile?.user.userIcon}
                sx={{ padding: 0 }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: 1.5,
                  justifyContent: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "16px",
                  }}
                >
                  {author?.firstName} {author?.lastName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    textAlign: "left",
                    lineHeight: "15px",
                    pt: "3px",
                  }}
                >
                  {createdAt && formatDate(createdAt)}
                </Typography>
              </Box>
            </IconButton>
          </Link>
        </Box>
        <Link to={`/post/${_id}`}>
          <Box
            sx={{
              height: { xs: "inherit", sm: "260px", md: "260px" },
              width: { xs: "295px", sm: "500px", md: "600px" },
              maxWidth: { xs: "295px", sm: "500px", md: "600px" },
              // border: "solid 1px black",
              borderBottom: "solid 1px #dedede",
              mb: 2,
              backgroundColor: "#fff",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {/* ///////////////////////////// カード上部コンテンツ */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: {
                  xs: "column-reverse",
                  sm: "row",
                  med: "row",
                  lg: "row",
                },
                height: { xs: "100%", sm: "205px", md: "205px" },
                position: "relative",
              }}
            >
              {/* ///////////////////////////// カード左半分コンテンツ */}

              <Box
                sx={{
                  width: { xs: "100%", sm: "100%", md: "52%" },
                  ml: { xs: 1, sm: 3, md: 3 },
                  mr: { xs: 1, sm: 2, md: 2 },
                  mt: { xs: 2, sm: 2, md: 2 },
                }}
              >
                <Box sx={{ mt: { xs: 0, sm: 6 } }}>
                  <Typography
                    variant="h1"
                    sx={(theme) => ({
                      pt: { xs: 0.5, md: "inherit" },
                      width: { xs: "90%", sm: "100%" },
                      fontSize: "22px",
                      fontWeight: "500",
                      lineHeight: "22px",
                      // minHeight: "30px",
                      wordBreak: "break-word",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3, // 行数指定
                      overflow: "hidden",
                      textAlign: { xs: "center", sm: "inherit" },
                      minHeight: {
                        xs:
                          title?.length > 63
                            ? "72px"
                            : (title?.length <= 43) & (title?.length > 22)
                            ? "54px"
                            : "32px",
                        sm:
                          title?.length > 63
                            ? "71.6px"
                            : (title?.length <= 42) & (title?.length > 21)
                            ? "54px"
                            : "32px",
                        md:
                          title?.length > 48
                            ? "68px"
                            : (title?.length <= 48) & (title?.length > 24)
                            ? "46px"
                            : "25px",
                      },
                    })}
                  >
                    {title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#6b6b6b",
                      fontSize: { xs: "18px", md: "20px" },
                      fontWeight: "300",
                      lineHeight: { xs: "19px", md: "21px" },
                      minHeight: { sm: "58px", md: "65px" },
                      maxHeight: "63.5px",
                      wordBreak: "break-word",

                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3, // 行数指定
                      overflow: "hidden",
                      width: "93%",
                      textAlign: { sx: "center", md: "inherit" },
                    }}
                  >
                    {contentWithoutImgsOrStyles}
                  </Typography>
                </Box>
              </Box>

              <Box
                component="img"
                src={`http://localhost:4000/${cover}`}
                sx={{
                  width: { xs: "100%", sm: "45%", md: "45%" },
                  minWidth: { xs: "100%", sm: "45%", md: "45%" },
                  maxWidth: { xs: "100%", sm: "45%", md: "45%" },
                  height: "260px",
                  // minHeight: "230px",
                  // maxHeight: "230px",
                  borderRadius: { xs: "10px 10px 0 0", sm: "0 10px 0 0" },
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

Post.propTypes = {
  title: PropTypes.string.isRequired,
  // 他のpropsも同様に定義することができる
  // 例: _id: PropTypes.string.isRequired,
};

export default Post;
