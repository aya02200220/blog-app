import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
// import UserModel from "../../../api/models/User";

import styles from "../styles/main.module.scss";

// import { LoginIcon } from "./LoginIcon";

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
// import { FavoriteBorderRounded, FavoriteRounded } from "@material-ui/icons";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import IconButton from "@material-ui/core/IconButton";
// import FavoriteBorderRounded from "@material-ui/icons/FavoriteBorderRounded";
import Share from "@material-ui/icons/Share";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { useSlopeCardMediaStyles } from "@mui-treasury/styles/cardMedia/slope";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
// import TextInfoContent from "@mui-treasury/components/content/textInfo";

import { UserContext } from "./UserContext";

export const FavoritePage = () => {
  return (
    <Box marginBottom={"20px"} sx={{ position: "relative" }}>
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
                minHeight: "58px",
                maxHeight: "58px",

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
              m: 1,
              zIndex: "tooltip",
              display: "flex",
            }}
          >
            <IconButton size="small">
              <Share />
            </IconButton>
            <IconButton
              size="small"
              // ml="2"
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
};
