import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { LoginIcon } from "./LoginIcon";

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
import { FormLabel } from "@material-ui/core";
import { Comments } from "./Comments";

const Comment = ({ postInfo }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { userInfo } = useContext(UserContext);

  const postId = postInfo._id;

  useEffect(() => {
    setComments(postInfo?.comments);
  }, [postInfo]);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/post/comments/${postId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: comment }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setComment("");
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/posts/${postId}/comments/${commentId}`,
        // `http://localhost:4000/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 認証情報を送信
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error(`Failed to delete the comment: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to delete the comment:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/post/comments/${postId}`
      );
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
          sx={{ height: "100%" }}
        />
        <Button
          variant="contained"
          onClick={(e) => addComment(e)}
          sx={{ height: "50px", ml: 1 }}
        >
          Submit
        </Button>
      </Box>

      <Box>
        {comments
          .slice()
          .reverse()
          .map((com) => {
            return (
              <Comments
                fetchComments={fetchComments}
                key={com._id}
                contents={com}
                passPostId={postId}
              />
            );
          })}
      </Box>
    </>
  );
};

export default Comment;
