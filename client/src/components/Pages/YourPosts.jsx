import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { FavPost } from "./FavPost";

const YourPosts = () => {
  const { userInfo } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:4000/posts", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((posts) => {
        // ログインしているユーザーの投稿を絞り込む
        const userPosts = posts.filter(
          (post) => post.author.email === userInfo.email
        );
        setUserPosts(userPosts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [userInfo]);

  return (
    <>
      <Typography
        sx={{
          ml: 5,
          color: "#4e575f",
          fontWeight: "500",
          position: "absolute",
        }}
      >
        Your Posts
      </Typography>
      {!loading && (
        <Box
          sx={{
            margin: "0 130px",
            marginTop: "100px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {userPosts.length > 0 ? (
            userPosts.map((post) => <FavPost key={post._id} {...post} />)
          ) : (
            <Typography variant="body1" sx={{ mt: 4, ml: 4 }}>
              No posts found.
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default YourPosts;
