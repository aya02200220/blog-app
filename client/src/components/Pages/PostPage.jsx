import styles from "../../styles/main.module.scss";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  console.log("postInfo", postInfo);

  if (!postInfo) return "";
  return (
    <div className={styles.mainContainer}>
      <div className={styles.postPage}>
        <h1 className={styles.postPageTitle}>{postInfo.title}</h1>
        <time className={styles.postPageTime}>
          {formatISO9075(new Date(postInfo.createdAt))}
        </time>
        <div className={styles.postPageAuthor}>
          by @{postInfo.author.firstName} {postInfo.author.lastName}
        </div>
        {userInfo.id === postInfo.author._id && (
          <div className={styles.postPageEdit}>
            <Link
              className={styles.postPageEditButton}
              to={`/edit/${postInfo._id}`}
            >
              <FontAwesomeIcon
                className={styles.postPageEditIcon}
                icon={faPenToSquare}
              />
              Edit this post
            </Link>
          </div>
        )}
        <div className={styles.postPageImgContainer}>
          <img
            className={styles.postPageImg}
            src={`http://localhost:4000/${postInfo.cover}`}
            alt=""
          />
        </div>
        <div
          className={styles.postPageContent}
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </div>
  );
};

export default PostPage;
