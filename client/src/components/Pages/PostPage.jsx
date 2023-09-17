import styles from "../../styles/main.module.scss";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { SERVER_URL } from "../../Constants";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Box, IconButton, Tooltip, Skeleton, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

import { AuthorInfo } from "./AuthorInfo";
import { GetLocalStorage } from "../Functions/LocalStorage";
import Comment from "../Comment";

const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAllRendered, setIsAllRendered] = useState(false);
  const [postInfo, setPostInfo] = useState(null);
  const [favorite, setFavorite] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [commentUpdated, setCommentUpdated] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate(); // 2. useNavigateを使ってnavigate関数を取得
  const location = useLocation(); // 現在のlocationオブジェクトを取得

  const handleBackClick = () => {
    // console.log("location.state", location.state);
    if (location.state) {
      navigate(location.state); // 前のページに戻る
    } else {
      navigate("/"); // デフォルトのページに戻る
    }
  };

  useEffect(() => {
    const localStorageUserInfo = GetLocalStorage();
    if (localStorageUserInfo) {
      // setStorageFirstName(userInfo.firstName);
      // setStorageLastName(userInfo.lastName);
      // setStorageUserName(userInfo.email);
      setUserInfo(localStorageUserInfo);
    }
  }, []);

  // console.log("Post page userInfo:", userInfo);

  const handleComplete = () => {
    // console.log(
    //   "孫コンポーネントのレンダリングが終わり、子コンポーネントからのcallbackが完了"
    // );
    setIsAllRendered(true);
  };

  useEffect(() => {
    setLoading(true);

    fetch(`${SERVER_URL}/post/${id}`).then((res) => {
      res.json().then((postInfo) => {
        setPostInfo(postInfo);
        setLoading(false);
        const favoriteIds = userInfo ? Object.keys(userInfo).length > 0 : false;

        // console.log("Post page postinfo-----------------:", postInfo);

        if (favoriteIds) {
          setFavorite(isFavorite(postInfo._id));
          // console.log("postInfo._id:", postInfo._id);
        }
      });
    });
  }, []);

  // ログイン中のユーザーがお気に入りに入れているかを判定する関数
  const isFavorite = (postId) => {
    return userInfo?.favorites?.includes(postId);
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            mt: 6,
            display: "flex",
            gap: { xs: 0, sm: 2, md: 3, lg: 5 },
            justifyContent: "center",
            ml: { xs: 0, sm: 0, md: 1, lr: 3 },
            mr: { xs: 0, sm: 0, md: 1, lr: 3 },
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleBackClick}
            variant="outlined"
            sx={{
              fontSize: "14px",
              height: "22px",
              borderRadius: 1,
              position: "fixed",
              top: "80px",
              left: { xs: "60px", sm: "77px", md: "249px", lr: "300px" },
              backgroundColor: "#fff",
              zIndex: 1,
            }}
          >
            <ArrowBackIcon icon={faPenToSquare} />
            BACK
          </IconButton>

          {userInfo?.id && userInfo.id === postInfo?.author._id && (
            <Box sx={{ position: "absolute", top: "-32px", right: "0" }}>
              <Tooltip title="Edit post">
                <IconButton
                  component={Link}
                  to={`/edit/${postInfo._id}`}
                  variant="outlined"
                  sx={{
                    fontSize: "14px",
                    height: "22px",
                    borderRadius: 1,
                    background: "#77acda",
                    color: "#fff",
                    zIndex: 1,
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <Typography sx={{ pl: 1 }}>EDIT</Typography>
                </IconButton>
              </Tooltip>
            </Box>
          )}

          <Box>
            <AuthorInfo
              postInfo={postInfo}
              commentUpdated={commentUpdated}
              favorite={favorite}
              loginUser={userInfo}
              onComplete={handleComplete}
            />
          </Box>

          {/* ///////////////////////////////////////////////// */}

          {loading ? (
            <>
              <Box
                sx={{
                  minWidth: { xs: "90%", sm: "55%", md: "65%" },
                }}
              >
                <Stack spacing={1}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={"100%"}
                    height={40}
                  />
                  <Skeleton variant="text" width={"100%"} height={20} />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={"100%"}
                    height={350}
                  />
                  <Skeleton variant="text" width={"80%"} height={30} />
                  <Skeleton variant="text" width={"90%"} height={30} />
                  <Skeleton variant="text" width={"80%"} height={30} />
                </Stack>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  // border: "solid 1px black",
                  flexGrow: 1,
                  minWidth: { xs: "90%", sm: "55%", md: "65%" },
                  maxWidth: "650px",
                  pb: "50px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  backgroundColor: "#fff",
                  borderRadius: 4,
                  p: 3,
                }}
              >
                <Box
                  className={styles.postTitle}
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "23px", sm: "28px", md: "35px" },
                    lineHeight: { xs: "22px", sm: "27px", md: "34px" },
                    fontWeight: "600",
                    mb: "5px",
                    wordBreak: "break-word",
                  }}
                >
                  {postInfo.title}
                </Box>

                <Box
                  className={styles.postAuthor}
                  sx={{
                    color: "#969696",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "18px",
                    mb: 1,
                    gap: { xs: 0, sm: 2 },
                    flexDirection: { xs: "column", sm: "row" },
                    lineHeight: { xs: "18px", sm: "inherit" },
                  }}
                >
                  <div>
                    by {postInfo.author.firstName} {postInfo.author.lastName}
                  </div>

                  <Box>
                    {format(new Date(postInfo.createdAt), "yyyy-MM-dd HH:mm")}
                  </Box>
                </Box>

                <div>
                  <img src={postInfo.cover} alt="" />
                </div>
                <Box
                  sx={{ width: "100%", wordBreak: "break-word" }}
                  className={styles.contentBox}
                  dangerouslySetInnerHTML={{ __html: postInfo.content }}
                />

                <Box id="comments-section" sx={{ mb: 4 }}></Box>
                <Box sx={{ mt: 5, mb: 3, width: "100%" }}>
                  <Comment
                    postInfo={postInfo}
                    onCommentAdded={() => setCommentUpdated(!commentUpdated)}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PostPage;
