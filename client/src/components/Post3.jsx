import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// import styles from "../styles/main.module.scss";

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
  const userName = userInfo?.email;

  const handleFavoriteClick = (postId) => {
    console.log(postId);
    console.log(userName);

    if (!userName) {
      toast.error("You need to login to bookmark!");
      return;
    }

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
            <Typography
              align="center"
              sx={{
                margin: "5px 15px",
                fontWeight: "600",
                fontSize: "17px",
                lineHeight: "18px",
                minHeight: "56px",
                maxHeight: "63px",

                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // 行数指定
                overflow: "hidden",
              }}
            >
              {title}
            </Typography>
          </CardContent>

          <Box>
            <Typography
              sx={{
                margin: "0px 12px",
                fontSize: "14px",
                lineHeight: "15px",
                minHeight: "60px",
                maxHeight: "60px",

                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 4, // 行数指定
                overflow: "hidden",
              }}
            >
              {summary}
            </Typography>
          </Box>

          <Box
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
