// import styles from "../../styles/main.module.scss";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Box, Container } from "@mui/material/";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { SideMenu } from "../SideMenu";

import Post from "../Post2";

const IndexPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setUserInfo, userInfo } = useContext(UserContext);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);

  if (userInfo) {
    console.log(
      "userInfoStringのオブジェクト要素数:",
      Object.keys(userInfo).length
    );
  }
  console.log("firstName:", firstName);
  console.log("lastName:", lastName);
  console.log("userName email:", userName);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfoObj = JSON.parse(userInfoString);
      // setUserInfo(userInfoObj);
      setFirstName(userInfoObj.firstName);
      setLastName(userInfoObj.lastName);
      setUserName(userInfoObj.email);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        const userInfoObj = JSON.parse(userInfoString);
        setUserName(userInfoObj.email);

        if (userInfoObj.email) {
          const response = await fetch("http://localhost:4000/favorites", {
            credentials: "include",
          });
          const favoritesData = await response.json();
          setFavorites(favoritesData);
        }
      }

      const postsResponse = await fetch("http://localhost:4000/post");
      const postsData = await postsResponse.json();
      setPosts(postsData);
      setLoading(false); // Only set loading to false once both requests have finished
    };

    fetchData();
    // }, [userName, userInfo]);
  }, []);

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
        <>
          {/* <Box sx={{ display: { xs: "none", sm: "none=–", md: "block" } }}>
            <SideMenu userName={userName} />
          </Box> */}
          <Container component="main">
            <Box
              sx={{
                // pl: { sx: 0, sm: 0, md: "250px" },
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
                    // console.log("post", post);
                    const isFavorite =
                      favorites &&
                      Array.isArray(favorites) &&
                      favorites.some((favorite) => favorite._id === post._id);
                    return (
                      <Post key={post._id} {...post} favorite={isFavorite} />
                    );
                  })
                )}
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default IndexPage;
