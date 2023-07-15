import styles from "../../styles/main.module.scss";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:4000/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
        setLoading(false);
      });
    });
  }, []);

  console.log("postInfo", postInfo);

  if (!postInfo) return "";
  return (
    <>
      {loading ? (
        <Box sx={{ mt: "150px", display: "flex", justifyContent: "center" }}>
          <CircularProgress />
          <Typography sx={{ ml: "20px", fontSize: "20px" }}>
            Loading....
          </Typography>
        </Box>
      ) : (
        <div className={styles.mainContainer}>
          <Box
            sx={{
              maxWidth: "650px",
              pb: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={styles.postPage}
          >
            <Box
              sx={{
                textAlign: "center",
                fontSize: { xs: "20px", sm: "25px", md: "30px" },
                lineHeight: { xs: "20px", sm: "25px", md: "30px" },
                fontWeight: "600",
                mb: "10px",
              }}
            >
              {postInfo.title}
            </Box>
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
            <Box
              className={styles.postPageContent}
              dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
          </Box>
        </div>
      )}
      ;
    </>
  );
};

export default PostPage;
