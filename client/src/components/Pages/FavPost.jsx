import * as React from "react";
import {
  Button,
  Box,
  Typography,
  CardContent,
  CardActions,
  CardMedia,
  Card,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { format, differenceInDays, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { LoginIcon } from "../LoginIcon";

export const FavPost = ({
  _id = "1",
  title = "No title",
  cover = "No cover",
  content = "No content",
  createdAt,
  author = "No author",
  authorProfile,
}) => {
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
    <Link to={`/post/${_id}`}>
      <Box
        sx={{
          maxWidth: "100%",
          height: { xs: "280px", sm: "400px", md: "110px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: "#fff",
          borderBottom: "solid 0.2px #c2c2c2",
        }}
      >
        <Box
          sx={{
            height: { xs: "65%", sm: "70%", md: "100%" },
            width: { xs: "100%", md: "30%" },
            maxWidth: { xs: "100%", md: "30%" },
            minWidth: { xs: "100%", md: "30%" },
            objectFit: "cover",
          }}
          component="img"
          src={"http://localhost:4000/" + cover}
        ></Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Link to={`/viewall`}>
            <IconButton
              size="large"
              edge="end"
              color="4e575f"
              sx={{
                p: 0,
                ml: 2,
                mt: 1,
                pr: 2,
                borderRadius: "50px 5px 5px 50px",
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
                  }}
                >
                  {createdAt && formatDate(createdAt)}
                </Typography>
              </Box>
            </IconButton>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              // border: "solid 1px black",
              width: "100%",
              p: 2,
              pt: 1,
            }}
          >
            <Typography
              sx={{
                color: "#404040",
                fontWeight: "500",
                fontSize: { xs: "16px", sm: "20px" },
                lineHeight: { xs: "16px", sm: "20px" },
                minHeight: { sm: "22px", md: "22px" },
                wordBreak: "break-word",

                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // 行数指定
                overflow: "hidden",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
