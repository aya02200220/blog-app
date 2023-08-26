import React, { useContext, useState, useEffect } from "react";
import { SERVER_URL } from "../Constants";
import { UserContext } from "./UserContext";
import { LoginIcon } from "./LoginIcon";
import { GetLocalStorage } from "./Functions/LocalStorage";

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
import { Comments } from "./Comments";

const Comment = ({ postInfo, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [storageID, setStorageID] = useState(null);
  const [storageIcon, setStorageIcon] = useState(null);

  const { userInfo } = useContext(UserContext);

  const postId = postInfo._id;

  useEffect(() => {
    setComments(postInfo?.comments);
  }, [postInfo]);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  useEffect(() => {
    const userInfo = GetLocalStorage();
    if (userInfo) {
      // setStorageFirstName(userInfo.firstName);
      // setStorageLastName(userInfo.lastName);
      setStorageIcon(userInfo.userIcon);
      setStorageID(userInfo._id);
    }
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/post/comments/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: comment }),
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setComment("");
      fetchComments();
      onCommentAdded();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (postId, commentId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/posts/${postId}/comments/${commentId}`,
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
        onCommentAdded();
      } else {
        console.error(`Failed to delete the comment: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to delete the comment:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/post/comments/${postId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const comments = await response.json();

      setComments(comments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
        Comments
      </Typography>
      <Divider />

      {Object.keys(userInfo).length > 0 ? (
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            height: "auto",
          }}
        >
          <Box sx={{ mt: 1 }}>
            <LoginIcon
              firstLetter={userInfo.firstName.charAt(0)}
              lastLetter={userInfo.lastName.charAt(0)}
              userIcon={storageIcon}
            />
          </Box>
          <TextField
            fullWidth
            type="text"
            id="comment"
            label="Add comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            // rowsMax={4}
            sx={{ height: "100%", ml: 1 }}
          />
          <Button
            variant="contained"
            onClick={(e) => addComment(e)}
            sx={{ height: "50px", ml: 1 }}
          >
            Submit
          </Button>
        </Box>
      ) : (
        <>
          <Typography
            sx={{
              mt: 2,
              fontSize: "20px",
              textAlign: "center",
              mb: 2,
              color: "#8c8c8c",
            }}
          >
            - Sign In to Leave Your Comments -
          </Typography>
          <Divider />
        </>
      )}

      <Box>
        {comments
          .slice()
          .reverse()
          .map((com) => {
            return (
              <Comments
                handleDelete={handleDelete}
                fetchComments={fetchComments}
                key={com._id}
                contents={com}
                passPostId={postId}
                storageID={storageID}
              />
            );
          })}
      </Box>
    </>
  );
};

export default Comment;
