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

  // const postId = postInfo._id;
  // setComments(postInfo.comments);

  // console.log("userInfo @ Comment:", userInfo);
  // console.log("postInfo @ Comment:", postInfo);
  // console.log("postId:", postId);

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await fetch(`/api/posts/${postId}/comments`);
  //       if (!response.ok) {
  //         throw new Error("Response is not OK");
  //       }
  //       const comments = await response.json();
  //       setComments(comments); // Assuming comments is a state variable
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchComments();
  // }, [postId]);

  // const addComment = async () => {
  //   try {
  //     const response = await fetch(`/api/posts/${postId}/comments`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ content: comment }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Response is not OK");
  //     }
  //     const post = await response.json();
  //     setComments(post.comments); // Assuming comments is a state variable
  //     setComment("");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
