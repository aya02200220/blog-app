import styles from "../../styles/main.module.scss";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

// import Post from "../Post";
// import Post from "../Post2";
import Post from "../Post3";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((res) => {
      res.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          margin: "0 130px",
          marginTop: "100px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}

        // className={`${styles["posts"]} ${styles["mainContainer"]}`}
      >
        {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      </Box>
    </>
  );
};

export default IndexPage;
