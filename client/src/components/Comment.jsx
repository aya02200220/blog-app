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

const Comment = ({ postInfo }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { userInfo } = useContext(UserContext);

  const postId = postInfo._id;

  // console.log("userInfo @ Comment:", userInfo);
  // console.log("postInfo @ Comment:", postInfo);
  // console.log("postId:", postId);

  useEffect(() => {
    setComments(postInfo?.comments);
  }, [postInfo]);

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/post/comments/${postId}`,
        // `http://localhost:4000/post/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: comment }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error); // Changed this line to display the server error message
      }

      // setComments(post.comments); // Assuming comments is a state variable
      // setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const addComment2 = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/post/${postId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: comment }),
        }
      );
      // if (!response.ok) {
      //   throw new Error("Response is not OK");
      // }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error); // Changed this line to display the server error message
      }

      const post = await response.json();
      setComments(post.comments); // Assuming comments is a state variable
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:4000/post/:id/comments`);
  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.error);
  //       }
  //       const comments = await response.json();
  //       setComments(comments);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchComments();
  // }, [postId]);

  return (
    <>
      <Typography sx={{ fontSize: "17px" }}>Comments</Typography>
      <Divider />

      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "56px",
        }}
      >
        <LoginIcon
          firstLetter={userInfo.firstName.charAt(0)}
          lastLetter={userInfo.lastName.charAt(0)}
        />
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
    </>
  );
};

export default Comment;
