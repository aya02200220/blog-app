import styles from "../styles/main.module.scss";
import cardStyle from "../styles/card.module.css";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <>
      <div>
        <Link to={`/post/${_id}`}>
          <article className={cardStyle.card}>
            <div className={cardStyle.temporary_text}>
              <img src={"http://localhost:4000/" + cover} alt="" />
            </div>
            <div className={cardStyle.card_content}>
              <div className={cardStyle.card_title}>{title}</div>
              <span className={cardStyle.card_subtitle}>
                <div className={styles.author}>{author.userName}</div>
                <time>{formatISO9075(new Date(createdAt))}</time>
              </span>
              <p className={cardStyle.card_description}>{summary}</p>
            </div>
          </article>
        </Link>
      </div>
      {/* <div className={styles.post}>
        <div className={styles.postImageContainer}>
          <div className={styles.authorContainer}>

          </div>

          <Link to={`/post/${_id}`}>
            <img
              className={styles.postImage}
              src={"http://localhost:4000/" + cover}
              alt=""
            />
          </Link>
        </div>
        <div className={styles.postContents}>
          <Link to={`/post/${_id}`}>
            <h2 className={styles.postTitle}>{title}</h2>
          </Link>

          <div className={styles.info}>
            <div className={styles.author}>{author.userName}</div>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </div>
          <p className={styles.postWriting}>{summary}</p>
        </div>
      </div> */}
    </>
  );
};

export default Post;
