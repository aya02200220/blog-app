import { useEffect, useState } from "react";
// import { UserContext } from "../UserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { FavPost } from "./FavPost";
import { Container } from "@mui/material";
import { FetchUser } from "../Functions/FetchUser";

const FavoritePage = () => {
  // const { userInfo } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfiles, setUserProfiles] = useState({});
  const [favoritesUpdated, setFavoritesUpdated] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:4000/favorites", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((favorites) => {
        setFavorites(favorites);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
        setLoading(false);
      });
  }, [favoritesUpdated]);

  useEffect(() => {
    const fetchUser = async () => {
      const newProfiles = {};
      const promises = [];

      for (const post of favorites) {
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
  }, [favorites]);

  const removePostFromFavorites = (postId) => {
    console.log("確認");
    setFavorites((prevFavorites) =>
      prevFavorites.filter((post) => post._id !== postId)
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            ml: 5,
            color: "#4e575f",
            fontWeight: "500",
            marginTop: 0,
            fontSize: "25px",
            lineHeight: "20px",
            textTransform: "uppercase",
          }}
        >
          Reading List ({favorites.length})
        </Typography>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          {loading ? (
            <Box
              sx={{ mt: "150px", display: "flex", justifyContent: "center" }}
            >
              <CircularProgress />
              <Typography sx={{ ml: "20px", fontSize: "20px" }}>
                Loading....
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                maxWidth: "700px",
                width: "100%",
                // overflowY: "auto",
              }}
            >
              {favorites.length > 0 ? (
                favorites.map((post) => {
                  const authorProfile = userProfiles[post.author._id];
                  return (
                    <FavPost
                      key={post._id}
                      {...post}
                      authorProfile={authorProfile}
                      onRemovePost={removePostFromFavorites}
                    />
                  );
                })
              ) : (
                <Typography variant="body1" sx={{ mt: 4, ml: 4 }}>
                  No Reading Lists found.
                </Typography>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default FavoritePage;
