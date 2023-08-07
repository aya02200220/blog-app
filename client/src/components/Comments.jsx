import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { format } from "date-fns";
import { GetLocalStorage } from "./Functions/LocalStorage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Box,
  Input,
  Typography,
  Button,
  IconButton,
  Divider,
  Skeleton,
  CircularProgress,
  TextField,
} from "@mui/material";
import { LoginIcon } from "./LoginIcon";

export const Comments = ({ contents }) => {
  const commentStyle = {
    maxHeight: "5em",
    overflowY: "auto",
    wordWrap: "break-word",
  };

  // const [storageFirstName, setStorageFirstName] = useState(null);
  // const [storageLastName, setStorageLastName] = useState(null);
  // const [storageUserName, setStorageUserName] = useState(null);
  const [storageID, setStorageID] = useState(null);

  useEffect(() => {
    const userInfo = GetLocalStorage();
    if (userInfo) {
      // setStorageFirstName(userInfo.firstName);
      // setStorageLastName(userInfo.lastName);
      // setStorageUserName(userInfo.email);
      setStorageID(userInfo.id);
    }
  }, []);

  const author = contents.author || {};
  const {
    _id: authorId = "",
    firstName = "",
    lastName = "",
    userIcon = "",
  } = author;
  const content = contents.content || "";
  const createdAt = contents.createdAt || "";
  const updatedAt = contents.updatedAt || "";
  const _id = contents._id || "";

  const firstLetter = firstName ? firstName.charAt(0) : "";
  const lastLetter = lastName ? lastName.charAt(0) : "";
  const formattedCreatedAt = createdAt
    ? format(new Date(createdAt), "MMM d , yyyy")
    : "";

  const { userInfo } = useContext(UserContext);
  const isAuthor = authorId === storageID;

  console.log(authorId, userInfo._id);
  console.log();

  const handleEdit = () => {
    // Edit comment logic here
  };

  const handleDelete = () => {
    // Delete comment logic here
  };

  return (
    <>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ mt: "3px", width: "12%" }}>
          <LoginIcon
            firstLetter={firstLetter}
            lastLetter={lastLetter}
            userIcon={userIcon}
          />
        </Box>
        <Box sx={{ width: "88%" }}>
          <Box
            sx={{
              border: "solid 1px gray",
              p: "8px 15px",
              borderRadius: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontWeight: "600", color: "#4d4d4d" }}>
                  {firstName}
                </Typography>
                <Typography sx={{ fontWeight: "600", color: "#4d4d4d" }}>
                  {lastName}
                </Typography>
                <Typography sx={{ ml: 1, color: "gray", fontWeight: "500" }}>
                  {formattedCreatedAt}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                {isAuthor && (
                  <>
                    {/* <EditIcon sx={{ fontSize: "20px" }} />
                    <DeleteIcon sx={{ fontSize: "20px" }} /> */}
                    <Button
                      onClick={handleEdit}
                      sx={{
                        padding: "0",
                        minWidth: "auto",
                        marginLeft: 1,
                        marginRight: 1,
                      }}
                    >
                      <EditIcon sx={{ fontSize: "20px", color: "#787878" }} />
                    </Button>
                    <Button
                      onClick={handleDelete}
                      sx={{
                        padding: "0",
                        minWidth: "auto",
                        marginLeft: 1,
                        marginRight: 1,
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: "20px", color: "#787878" }} />
                    </Button>
                  </>
                )}
              </Box>
            </Box>

            <Typography
              style={commentStyle}
              sx={{ lineHeight: "19px", mt: 1, wordWrap: "break-word" }}
            >
              {content}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
