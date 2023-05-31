import React from "react";
import styles from "../styles/main.module.scss";

const Post = () => {
  return (
    <section className={styles.posts}>
      <div className={styles.post}>
        <div className={styles.postImageContainer}>
          <img
            className={styles.postImage}
            src="https://images.pexels.com/photos/4321076/pexels-photo-4321076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
        <div className={styles.postContents}>
          <h2 className={styles.postTitle}>
            Poland is rearming itself at high speed — could Canada take a lesson
            from Warsaw?
          </h2>
          <div className={styles.info}>
            <a href="" className={styles.author}>
              Aya ishimura
            </a>
            <time datetime="">2023-05-31 17:00</time>
          </div>
          <p className={styles.postWriting}>
            A wind-swept pier at a naval port in Gdynia, Poland was the scene
            last December of an extraordinary display — one that Canada's
            defence community looks upon today with envy. Lined up
          </p>
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles.postImageContainer}>
          <img
            className={styles.postImage}
            src="https://images.pexels.com/photos/6858673/pexels-photo-6858673.jpeg"
            alt=""
          />
        </div>
        <div className={styles.postContents}>
          <h2 className={styles.postTitle}>
            Poland is rearming itself at high speed — could Canada take a lesson
            from Warsaw?
          </h2>
          <div className={styles.info}>
            <a href="" className={styles.author}>
              Aya ishimura
            </a>
            <time datetime="">2023-05-31 17:00</time>
          </div>
          <p className={styles.postWriting}>
            A wind-swept pier at a naval port in Gdynia, Poland was the scene
            last December of an extraordinary display — one that Canada's
            defence community looks upon today with envy. Lined up
            track-to-track on the pier that day, their gun barrels elevated,
            were two-dozen Thunder K9-A1 self-propelled howitzers manufactured
            in South Korea. Nearby, 10 Black Panther K2 54-tonne main battle
            tanks were parked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Post;
