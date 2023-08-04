// import styles from "../../styles/main.module.scss";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Box, IconButton, Button, Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { AuthorInfo } from "./AuthorInfo";

const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [postInfo, setPostInfo] = useState(null);
  const [favorite, setFavorite] = useState(null);

  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:4000/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
        setLoading(false);

        const favoriteIds = userInfo ? Object.keys(userInfo).length > 0 : false;

        if (favoriteIds) {
          setFavorite(isFavorite(postInfo._id));
          console.log("postInfo._id:", postInfo._id);
        }
      });
    });
  }, []);

  // ログイン中のユーザーがお気に入りに入れているかを判定する関数
  const isFavorite = (postId) => {
    return userInfo?.favorites?.includes(postId);
  };

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
        <Box>
          <Box
            sx={{
              mt: "110px",
              display: "flex",
              gap: { xs: 1, sm: 2, md: 3, lg: 5 },
              justifyContent: "center",
              ml: 3,
              mr: 3,
              position: "relative",
            }}
          >
            <Link to={`/`}>
              <IconButton
                variant="outlined"
                sx={{
                  fontSize: "14px",
                  height: "22px",
                  borderRadius: 1,
                  position: "fixed",
                  top: "80px",
                  left: { xs: "100px", md: "260px" },
                  backgroundColor: "#fff",
                  zIndex: 1,
                }}
              >
                <ArrowBackIcon icon={faPenToSquare} />
                BACK
              </IconButton>
            </Link>
            <Box>
              <AuthorInfo
                postInfo={postInfo}
                favorite={favorite}
                // userName={userName}
                // userId={userId}
                // _id={_id}
              />
            </Box>
            <div>
              <Box
                sx={{
                  maxWidth: "650px",
                  pb: "50px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "20px", sm: "25px", md: "30px" },
                    lineHeight: { xs: "20px", sm: "25px", md: "30px" },
                    fontWeight: "600",
                    mb: "5px",
                  }}
                >
                  {postInfo.title}
                  {userInfo.id === postInfo.author._id && (
                    <Box
                      sx={{ position: "absolute", top: "-35px", right: "0" }}
                    >
                      <Link to={`/edit/${postInfo._id}`}>
                        <Tooltip title="Edit post">
                          <IconButton
                            variant="outlined"
                            sx={{
                              fontSize: "14px",
                              height: "22px",
                              borderRadius: 1,
                              background: "#77acda",
                              color: "#fff",
                            }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            EDIT
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    color: "#969696",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "15px",
                    mb: 1,
                    gap: { xs: 0, sm: 2 },
                    flexDirection: { xs: "column", sm: "row" },
                    lineHeight: { xs: "18px", sm: "inherit" },
                  }}
                >
                  <div>
                    by {postInfo.author.firstName} {postInfo.author.lastName}
                  </div>
                  <time>
                    {format(new Date(postInfo.createdAt), "yyyy-MM-dd HH:mm")}
                  </time>
                </Box>
                <div>
                  <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
                </div>
                <Box dangerouslySetInnerHTML={{ __html: postInfo.content }} />
              </Box>
            </div>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PostPage;
