import React, { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MessageIcon from "@mui/icons-material/Message";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { Link } from "react-router-dom";

export const AuthorInfo = ({ ...props }) => {
  const [isFollowing, setIsFollowing] = useState("false");
  const [isBookMarked, setIsBookMarked] = useState("false");

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  const avatarFirstName = props.postInfo.author.firstName;
  const avatarLastName = props.postInfo.author.lastName;

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
            // backgroundImage:
            //   "linear-gradient(150deg, rgba(238, 238, 238, 1), rgba(231, 231, 231, 1) 4%, rgba(255, 255, 255, 1) 75%)",
            // backgroundImage:
            //   "linear-gradient(150deg, rgba(238, 237, 237, 1), rgba(255, 255, 255, 1) 49%, rgba(246, 246, 246, 1))",
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
                {...stringAvatar(`${avatarFirstName} ${avatarLastName}`)}
                src="/static/images/avatar/1.jpg"
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
                    lineHeight: "12px",
                  }}
                >
                  {avatarFirstName} {avatarLastName}
                </Typography>
                <Typography></Typography>
              </Box>
            </Link>
            <Box mt={2}>
              <Typography
                sx={{
                  lineHeight: "10px",
                  wordBreak: "break-word",
                  fontSize: "15px",
                }}
              >
                Follower: {"120"}
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
                  <Typography>2</Typography>
                </Box>
              </IconButton>

              <IconButton
                size="small"
                sx={{ borderRadius: 1.5, width: "50px" }}
              >
                {isBookMarked ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TurnedInNotIcon />
                    <Typography>20</Typography>
                  </Box>
                ) : (
                  <Box sx={{ mt: 2, display: "flex" }}>
                    <BookmarkAddedIcon />
                    <Typography>Following</Typography>
                  </Box>
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
