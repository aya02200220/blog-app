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

  const [userInfoString, setUserInfoString] = useState([]);
  const [firstName, setFirstName] = useState(userInfoString?.firstName);
  const [lastName, setLastName] = useState(userInfoString?.lastName);
  const [userName, setUserName] = useState(userInfoString?.email);

  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedInUser = localStorage.getItem("userInfo");

  if (userInfoString) {
    console.log(
      "userInfoStringのオブジェクト要素数:",
      Object.keys(userInfoString).length
    );
  }
  console.log(userInfoString);
  console.log("firstName:", userInfoString?.firstName, firstName);
  console.log("lastName:", userInfoString?.lastName, lastName);
  console.log("userName email:", userInfoString?.email, userName);

  useEffect(() => {
    setLoading(true); // ローディングを表示

    if (loggedInUser) {
      console.log("userInfo true:", loggedInUser.firstName);
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
    } else {
      console.log("userInfo false:", loggedInUser);
      setFavorites("");
    }

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
                console.log("post", post);
                const isFavorite =
                  favorites &&
                  Array.isArray(favorites) &&
                  favorites.some((favorite) => favorite._id === post._id);
                return <Post key={post._id} {...post} favorite={isFavorite} />;
              })
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default IndexPage;
