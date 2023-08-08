import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

import { Box, Typography, Button, TextField } from "@mui/material";
import { LoginIcon } from "./LoginIcon";

export const Comments = ({
  contents,
  passPostId,
  fetchComments,
  storageID,
}) => {
  const commentStyle = {
    maxHeight: "5em",
    overflowY: "auto",
    wordWrap: "break-word",
  };

  // const [storageFirstName, setStorageFirstName] = useState(null);
  // const [storageLastName, setStorageLastName] = useState(null);
  // const [storageUserName, setStorageUserName] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(false);

  const author = contents.author || {};
  const {
    _id: authorId = "",
    firstName = "",
    lastName = "",
    userIcon = "",
  } = author;

  const content = contents.content || "";
  const createdAt = contents.createdAt || "";
  const commentId = contents._id || "";
  const postId = passPostId || "";

  const firstLetter = firstName ? firstName.charAt(0) : "";
  const lastLetter = lastName ? lastName.charAt(0) : "";
  const formattedCreatedAt = createdAt
    ? format(new Date(createdAt), "MMM d , yyyy")
    : "";

  const isAuthor = authorId === storageID;

  const handleEdit = () => {
    setEditedComment(contents.content || "");
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(
        `http://localhost:4000/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editedComment }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        fetchComments();
      } else {
        console.error(`Failed to delete the comment: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to delete the comment:", error);
    }
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
        <Box sx={{ mt: "3px", mr: "5px", width: "40px" }}>
          <LoginIcon
            firstLetter={firstLetter}
            lastLetter={lastLetter}
            userIcon={userIcon}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              p: "8px 15px",
              borderRadius: "4px",
              backgroundColor: isAuthor ? "#faf1bf" : "#c9e9ff",
              border: isAuthor ? "solid 3px #c4bd98" : "solid 3px #c0dbed",
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
                <Typography sx={{ ml: 1, fontWeight: "600", color: "#4d4d4d" }}>
                  {lastName}
                </Typography>
                <Typography sx={{ ml: 2, color: "gray", fontWeight: "500" }}>
                  {formattedCreatedAt}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                {isAuthor && (
                  <>
                    <Button
                      onClick={handleEdit}
                      sx={{
                        padding: "0",
                        minWidth: "auto",
                        marginLeft: 1,
                        marginRight: 1,
                      }}
                    >
                      {isEditing ? (
                        <CancelSharpIcon
                          sx={{ fontSize: "20px", color: "#787878" }}
                        />
                      ) : (
                        <EditIcon sx={{ fontSize: "20px", color: "#787878" }} />
                      )}
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
            {isEditing ? (
              <TextField
                fullWidth
                type="text"
                id="comment"
                multiline
                variant="filled"
                sx={{ height: "100%" }}
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSave();
                    e.preventDefault(); // Prevents the addition of a new line in the input on pressing Enter
                  }
                }}
              />
            ) : (
              <Typography
                style={commentStyle}
                sx={{ lineHeight: "19px", mt: 1, wordWrap: "break-word" }}
              >
                {content}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
