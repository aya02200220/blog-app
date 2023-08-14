import React, { useContext, useState, useEffect } from "react";
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
import { FormLabel } from "@material-ui/core";
import { Comments } from "./Comments";

const Comment = ({ postInfo, onCommentAdded }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [storageID, setStorageID] = useState(null);

  // const { userInfo } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [userIcon, setUserIcon] = useState("");

  const postId = postInfo._id;

  useEffect(() => {
    setComments(postInfo?.comments);
  }, [postInfo]);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  useEffect(() => {
    setLoading(true);
    const fetchedUserInfo = GetLocalStorage();
    if (fetchedUserInfo) {
      console.log(fetchedUserInfo.firstName);
      setUserInfo(fetchedUserInfo);
      // setFirstName(userInfo.firstName);
      // setLastName(userInfo.lastName);
      // setUserName(userInfo.email);
      // setUserIcon(userInfo.userIcon);
      setStorageID(userInfo.id);
      setLoading(false);
      console.log("GetLocalStorage***********");
    }
  }, []);

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
      onCommentAdded();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (postId, commentId) => {
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

  if (loading) {
    return null;
  }

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
            firstLetter={userInfo.firstName?.charAt(0)}
            lastLetter={userInfo.lastName?.charAt(0)}
            userIcon={userInfo.userIcon}
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
