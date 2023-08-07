import styles from "../../styles/main.module.scss";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  Box,
  IconButton,
  Button,
  Tooltip,
  Skeleton,
  Stack,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

import { AuthorInfo } from "./AuthorInfo";
import Comment from "../Comment";

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
            mt: "110px",
            display: "flex",
            gap: { xs: 0, sm: 2, md: 3, lg: 5 },
            justifyContent: "center",
            ml: { xs: 0, sm: 0, md: 1, lr: 3 },
            mr: { xs: 0, sm: 0, md: 1, lr: 3 },
            position: "relative",
          }}
        >
          <IconButton
            component={Link}
            to="/"
            variant="outlined"
            sx={{
              fontSize: "14px",
              height: "22px",
              borderRadius: 1,
              position: "fixed",
              top: "80px",
              left: { xs: "60px", sm: "77px", md: "253px", lr: "300px" },
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
            <AuthorInfo postInfo={postInfo} favorite={favorite} />
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
                  minWidth: { xs: "90%", sm: "55%", md: "65%" },
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
                    fontSize: { xs: "23px", sm: "28px", md: "35px" },
                    lineHeight: { xs: "20px", sm: "25px", md: "30px" },
                    fontWeight: "600",
                    mb: "5px",
                  }}
                >
                  {postInfo.title}
                </Box>

                <Box
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
                  <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
                </div>
                <Box
                  className="contentBox"
                  dangerouslySetInnerHTML={{ __html: postInfo.content }}
                />

                <Box sx={{ mt: 5, width: "100%" }}>
                  <Comment postInfo={postInfo} />
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
