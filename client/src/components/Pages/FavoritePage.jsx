import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { FavPost } from "./FavPost";

const FavoritePage = () => {
  const { userInfo } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <>
      <Typography
        sx={{
          ml: 5,
          color: "#4e575f",
          fontWeight: "500",
          position: "absolute",
        }}
      >
        Your Bookmarks
      </Typography>
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
            margin: "0 130px",
            marginTop: "100px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {favorites.length > 0 ? (
            favorites.map((post) => <FavPost key={post._id} {...post} />)
          ) : (
            <Typography variant="body1" sx={{ mt: 4, ml: 4 }}>
              No Bookmark posts found.
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default FavoritePage;
