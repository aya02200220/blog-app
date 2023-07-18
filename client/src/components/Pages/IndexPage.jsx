// import styles from "../../styles/main.module.scss";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

// import Post from "../Post";
import Post from "../Post2";
// import Post from "../Post3";

const IndexPage = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true); // ローディングを表示

  //   fetch("http://localhost:4000/post")
  //     .then((res) => res.json())
  //     .then((posts) => {
  //       setPosts(posts);
  //       setLoading(false); // ローディングを非表示
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //       setLoading(false); // ローディングを非表示
  //     });

  //   // console.log("userInfo", userInfo);
  // }, [userInfo]);

  useEffect(() => {
    setLoading(true); // ローディングを表示

    fetch("http://localhost:4000/favorites", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((favorites) => {
        setFavorites(favorites);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });

    fetch("http://localhost:4000/post")
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
        setLoading(false); // ローディングを非表示
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false); // ローディングを非表示
      });

    console.log("userInfo", userInfo);
  }, [userInfo]);

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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              // margin: "0 130px",
              marginTop: "100px",
              display: "flex",
              flexDirection: "column",
              // flexWrap: "wrap",
              // justifyContent: "space-evenly",
            }}
          >
            {posts.length === 0 ? ( // postsが0件の場合にメッセージを表示
              <Typography variant="body1">No Post yet</Typography>
            ) : (
              posts.map((post) => {
                const isFavorite =
                  favorites &&
                  Array.isArray(favorites) &&
                  favorites.some((favorite) => favorite._id === post._id);
                return <Post key={post._id} {...post} favorite={isFavorite} />;
              })
            )}
            {/* {posts.length > 0 &&
              posts.map((post) => {
                const isFavorite =
                  favorites &&
                  Array.isArray(favorites) &&
                  favorites.some((favorite) => favorite._id === post._id);
                return <Post key={post._id} {...post} favorite={isFavorite} />;
              })} */}
          </Box>
        </Box>
      )}
    </>
  );
};

export default IndexPage;
