import styles from "../../styles/main.module.scss";
import { useEffect, useState } from "react";
// import Post from "../Post";
// import Post2 from "../Post2";
import Post3 from "../Post3";

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
      <section className={`${styles["posts"]} ${styles["mainContainer"]}`}>
        {posts.length > 0 && posts.map((post) => <Post3 {...post} />)}
        {/* {posts.length > 0 && posts.map((post) => <Post {...post} />)} */}
      </section>
    </>
  );
};

export default IndexPage;
