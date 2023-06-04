import styles from "../../styles/main.module.scss";
import { useEffect, useState } from "react";
import Post from "../post";

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
        {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      </section>
    </>
  );
};

export default IndexPage;
