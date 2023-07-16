import React, { useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
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
            border: "solid 1px black",
            height: "300px",
            width: "200px",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              border: "solid 1px black",
              mt: 1,
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
              <Box>
                <Typography
                  sx={{ lineHeight: "10px", wordBreak: "break-word" }}
                >
                  {avatarFirstName}
                </Typography>
                <Typography>{avatarLastName}</Typography>
              </Box>
            </Link>
            <Box mt={2}>
              <Typography sx={{ lineHeight: "10px", wordBreak: "break-word" }}>
                Follower: {"120"}
              </Typography>
            </Box>

            <Box>
              {isFollowing ? (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <ControlPointIcon />
                  <Typography>Follow</Typography>
                </Box>
              ) : (
                <Box sx={{ mt: 2, display: "flex" }}>
                  <FileDownloadDoneIcon />
                  <Typography>Following</Typography>
                </Box>
              )}
            </Box>

            <Box>
              {isBookMarked ? (
                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <TurnedInNotIcon />
                  <Typography>Follow</Typography>
                </Box>
              ) : (
                <Box sx={{ mt: 2, display: "flex" }}>
                  <BookmarkAddedIcon />
                  <Typography>Following</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
