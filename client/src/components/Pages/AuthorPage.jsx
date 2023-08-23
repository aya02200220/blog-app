import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Box from "@mui/material/Box";
import { CircularProgress, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AuthorPage } from "../AuthorPage";

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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            ml: 5,
            color: "#4e575f",
            fontWeight: "500",
            marginTop: 0,
            fontSize: "25px",
            lineHeight: "20px",
            textTransform: "uppercase",
          }}
        >
          Your Post ({userPosts.length})
        </Typography>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          {loading ? (
            <Box
              sx={{
                mt: "150px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
              <Typography sx={{ ml: "20px", fontSize: "20px" }}>
                Loading....
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                maxWidth: "700px",
                width: "100%",
                // height: "80vh",
                // overflowY: "auto",
                // border: "solid 1px black",
              }}
            >
              {userPosts.length > 0 ? (
                userPosts.map((post) => {
                  return <AuthorPage key={post._id} {...post} />;
                })
              ) : (
                <Typography variant="body1" sx={{ mt: 4, ml: 4 }}>
                  No Post found.
                </Typography>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default YourPosts;
