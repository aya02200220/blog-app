import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Favorite } from "./Functions/Favorite";

import toast from "react-hot-toast";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import cx from "clsx";
import { Box, IconButton, Button, Typography } from "@mui/material";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
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

  return (
    <>
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
                  width: { xs: "100%", sm: "100%", md: "52%" },
                  pr: { xs: "inherit", md: 2 },
                  ml: { xs: 1, sm: "0", md: "inherit" },
                  mr: { xs: 2, sm: "10px", md: "inherit" },
                }}
              >
                <Typography
                  variant="h1"
                  // sx={{
                  //   pt: { xs: 1, md: "inherit" },
                  //   width: { xs: "90%", sm: "100%" },
                  //   fontSize: "22px",
                  //   fontWeight: "500",
                  //   lineHeight: "22px",
                  //   minHeight: "30px",
                  //   wordBreak: "break-word",
                  //   display: "-webkit-box",
                  //   WebkitBoxOrient: "vertical",
                  //   WebkitLineClamp: 3, // 行数指定
                  //   overflow: "hidden",
                  //   textAlign: { xs: "center", sm: "inherit" },
                  //   // height: title.length > 60 ? "76.6px" : "auto",
                  //   height:
                  //     title.length > 60
                  //       ? "76.6px"
                  //       : title.length <= 44
                  //       ? "56px"
                  //       : "auto",
                  // }}
                  sx={(theme) => ({
                    pt: { xs: 1, md: "inherit" },
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
                    // height: "auto",
                    // maxHeight: { xs: "", sm: "", md: "77px" },
                    minHeight: {
                      xs:
                        title.length > 63
                          ? "76px"
                          : (title.length <= 43) & (title.length > 22)
                          ? "54px"
                          : "32px",
                      sm:
                        title.length > 63
                          ? "76px"
                          : (title.length <= 42) & (title.length > 21)
                          ? "54px"
                          : "32px",
                      md:
                        title.length > 48
                          ? "68.6px"
                          : (title.length <= 48) & (title.length > 24)
                          ? "45px"
                          : "25px",
                    },
                  })}
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
                  <Typography sx={{ fontSize: "14px", fontWeight: "700" }}>
                    {/* {author?.firstName} {author?.lastName} */}
                    {author.firstName} {author.lastName}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                    {formatDistanceToNow(new Date(createdAt))} ago
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    mt: "5px",
                    color: "#6b6b6b",
                    fontSize: { xs: "18px", md: "20px" },
                    fontWeight: "400",
                    lineHeight: "21px",
                    minHeight: "63.3px",
                    maxHeight: "63.3px",
                    wordBreak: "break-word",

                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // 行数指定
                    overflow: "hidden",
                  }}
                  // dangerouslySetInnerHTML={{ __html: content }}
                >
                  {contentWithoutImgsOrStyles}
                </Typography>
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

Post.propTypes = {
  title: PropTypes.string.isRequired,
  // 他のpropsも同様に定義することができる
  // 例: _id: PropTypes.string.isRequired,
};

export default Post;
