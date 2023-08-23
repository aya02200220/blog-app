// import styles from "../../styles/main.module.scss";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Box, Container } from "@mui/material/";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { GetLocalStorage } from "../Functions/LocalStorage";
import { fetchFavorites } from "../Functions/Favorites";
import { FetchUser } from "../Functions/FetchUser";

import Post from "../Post2";

const IndexPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});

  const { setUserInfo, userInfo } = useContext(UserContext);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  if (userInfo) {
    console.log(
      "userInfoStringのオブジェクト要素数:",
      Object.keys(userInfo).length
    );
  }
  // console.log("firstName:", firstName);
  // console.log("lastName:", lastName);
  // console.log("userName email:", userName);
  // console.log("favorites:", favorites);

  useEffect(() => {
    const userInfoString = GetLocalStorage();
    // console.log("userInfoString:", userInfoString);
    if (userInfoString) {
      // const userInfoObj = JSON.parse(userInfoString);
      // setUserInfo(userInfoObj);
      setFirstName(userInfoString.firstName);
      setLastName(userInfoString.lastName);
      setUserName(userInfoString.email);
      setUserId(userInfoString.id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = GetLocalStorage();
        if (userInfo) {
          // console.log("userInfo:", userInfo);
          setUserName(userInfo.email);
          setUserId(userInfo.id);

          if (userInfo.email) {
            const favoritesData = await fetchFavorites(userInfo.email);
            if (favoritesData) {
              setFavorites(favoritesData);
            }
          }
        }

        const postsResponse = await fetch("http://localhost:4000/post", {
          credentials: "include",
        });
        if (!postsResponse.ok) {
          throw new Error(`HTTP error! status: ${postsResponse.status}`);
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const newProfiles = {};
      const promises = [];

      for (const post of posts) {
        if (post.author && post.author._id) {
          promises.push(
            FetchUser(post.author._id).then((profile) => {
              newProfiles[post.author._id] = profile;
            })
          );
        }
      }

      await Promise.all(promises);

      setUserProfiles(newProfiles);
    };

    fetchUser();
  }, [posts]);

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
                  marginTop: "20px",
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

                    // ここでユーザーのIDを使ってプロフィールデータを取得
                    const authorProfile = userProfiles[post.author._id];

                    return (
                      <Post
                        key={post._id}
                        {...post}
                        favorite={isFavorite}
                        authorProfile={authorProfile}
                      />
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
