import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

// import { IconButton } from "@material-ui/core";
import { FavoriteBorderRounded, FavoriteRounded } from "@material-ui/icons";

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
    width: 350,
    height: 550,
    maxWidth: 350,
    maxHeight: 450,
    margin: "auto",
  },
  content: {
    padding: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    border: "2px solid #fff",
    margin: "-48px 32px 0 auto",
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
    <Link to={`/post/${_id}`}>
      <Card className={cx(cardStyles.root, shadowStyles.root)}>
        <CardMedia
          classes={mediaStyles}
          image={"http://localhost:4000/" + cover}
        />
        <Avatar
          className={cardStyles.avatar}
          src={"https://i.pravatar.cc/300"}
        />
        <CardContent className={cardStyles.content}>
          <TextInfoContent
            classes={textCardContentStyles}
            heading={title}
            body={summary}
          />
        </CardContent>
        <Box px={2} pb={2} mt={-1}>
          <IconButton>
            <Share />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              handleFavoriteClick(_id);
            }}
          >
            {isFavorite ? <FavoriteRounded /> : <FavoriteBorderRounded />}
          </IconButton>
        </Box>
      </Card>
    </Link>
  );
});

export default Post3;
