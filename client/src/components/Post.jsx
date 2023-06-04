import styles from "../styles/main.module.scss";

const Post = ({ title, summary, cover, contnt, createdAt }) => {
  return (
    <section className={`${styles["posts"]} ${styles["mainContainer"]}`}>
      {/* <div className={styles.post}>
        <div className={styles.postImageContainer}>
          <div className={styles.authorContainer}>
            <a href="" className={styles.authorName}>
              Aya ishimura sssssssssssssssssssssssssssssss
            </a>
          </div>
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
              Aya ishimurassssssssssssssss
            </a>
            <time datetime="">2023-05-31 17:00</time>
          </div>
          <p className={styles.postWriting}>
            A wind-swept pier at a naval port in Gdynia, Poland was the scene
            last December of an extraordinary display — one that Canada's
            defence community looks upon today with envy. Lined up
          </p>
        </div>
      </div> */}
      <div className={styles.post}>
        <div className={styles.postImageContainer}>
          <div className={styles.authorContainer}>
            <a href="" className={styles.authorName}>
              Aya ishimura
            </a>
          </div>
          <img
            className={styles.postImage}
            src="https://images.pexels.com/photos/6858673/pexels-photo-6858673.jpeg"
            alt=""
          />
        </div>
        <div className={styles.postContents}>
          <h2 className={styles.postTitle}>{title}</h2>
          <div className={styles.info}>
            <a href="" className={styles.author}>
              Aya ishimura
            </a>
            <time>{createdAt}</time>
          </div>
          <p className={styles.postWriting}>{summary}</p>
        </div>
      </div>
    </section>
  );
};

export default Post;
