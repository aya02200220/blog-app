import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import styles from "../styles/main.module.scss";

import { LoginIcon } from "./LoginIcon";

import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// import { IconButton } from "@material-ui/core";
import { FavoriteBorderRounded, FavoriteRounded } from "@material-ui/icons";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import IconButton from "@material-ui/core/IconButton";
// import FavoriteBorderRounded from "@material-ui/icons/FavoriteBorderRounded";
import Share from "@material-ui/icons/Share";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { useSlopeCardMediaStyles } from "@mui-treasury/styles/cardMedia/slope";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import TextInfoContent from "@mui-treasury/components/content/textInfo";

import { UserContext } from "./UserContext";

const useStyles = makeStyles(() => ({
  root: {
    width: 250,
    height: 320,
    maxWidth: 300,
    maxHeight: 400,
    // margin: "auto",
    margin: "0px 10px",
  },
  content: {
    padding: 2,
  },
  avatar: {
    backgroundColor: "#26788E",
    width: 50,
    height: 50,
    border: "2px solid #fff",
    margin: "-48px 14px 0 auto",
    "& > img": {
      margin: 0,
    },
  },
  ellipsisArea: {
    overflow: "hidden",
    width: "98%",
    maxWidth: 400,
    background: "#fff",
  },
  ellipsisArea_p: {
    fontWeight: "700",

    lineHeight: 1.1,
    position: "relative",
    margin: 0,
    "&:before, &:after": {
      position: "absolute",
    },
    "&:before": {
      content: '"..."',
      top: 35,
      right: -2,
    },
    "&:after": {
      content: '""',
      height: "100%",
      width: "100%",
      background: "#fff",
    },
  },
}));

export const Post3 = React.memo(function PostCard({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  const cardStyles = useStyles();
  const mediaStyles = useSlopeCardMediaStyles();
  const shadowStyles = useSoftRiseShadowStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();

  const [isFavorite, setIsFavorite] = useState(false);

  const { setUserInfo, userInfo } = useContext(UserContext);
  const userName = userInfo?.userName;

  const handleFavoriteClick = (postId) => {
    console.log(postId);
    console.log(userName);
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success("Added to your favorites");
    } else {
      toast.error("Removed from your favorites");
    }

    // ここにお気に入りの状態をサーバーに送信する処理などを追加することもできます
  };

  return (
    <Box marginBottom={"20px"}>
      <Link to={`/post/${_id}`}>
        <Card className={cx(cardStyles.root, shadowStyles.root)}>
          <CardMedia
            classes={mediaStyles}
            image={"http://localhost:4000/" + cover}
          />

          <Avatar className={cardStyles.avatar}>
            {author.firstName.charAt(0)}
            {author.lastName.charAt(0)}
          </Avatar>

          <CardContent className={cardStyles.content}>
            <Box className={cardStyles.ellipsisArea}>
              <Box
                sx={{ textAlign: "center", height: 54 }}
                className={cardStyles.ellipsisArea_p}
              >
                {title}
              </Box>
            </Box>
          </CardContent>
          {/* <CardContent
            className={cardStyles.content}
            style={{ whiteSpace: "nowrap" }}
          >
            <Box
              component="div"
              sx={{
                minHeight: "50px",
                maxHeight: "50px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                my: 2,
                p: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#101010" : "grey.100",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                borderRadius: 2,
                fontSize: "0.875rem",
                fontWeight: "700",
              }}
            >
              {title}
            </Box> */}
          {/* <Typography
              variant="h1"
              sx={{
                textOverflow: "ellipsis",
                fontSize: "20px",
                textAlign: "center",
                fontWeight: 500,
                ml: "5px",
                mr: "5px",
                lineHeight: "22px",
              }}
            >
              {title}
            </Typography> */}
          <Box className={cardStyles.ellipsisArea}>
            <Typography
              sx={{
                margin: "10px 15px",
                fontSize: "14px",
                lineHeight: "16px",
                minHeight: "56px",
                maxHeight: "56px",
              }}
            >
              {summary}
            </Typography>
          </Box>

          <Box
            // px={2}
            // pb={2}
            // mt={-1}
            sx={{
              zIndex: "tooltip",
            }}
          >
            <IconButton>
              <Share />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                handleFavoriteClick(_id);
              }}
            >
              {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>
        </Card>
      </Link>
    </Box>
  );
});

export default Post3;
