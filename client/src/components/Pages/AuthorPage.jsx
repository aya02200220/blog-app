import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";

import { CircularProgress, Container, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DisplayAuthorPage } from "../DisplayAuthorPage";
import { AuthorPageTop } from "../AuthorPageTop";
import { GetLocalStorage } from "../Functions/LocalStorage";

const AuthorPage = () => {
  const { userInfo } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(() => {
    const localUserInfo = GetLocalStorage();
    return localUserInfo ? localUserInfo._id : null;
  });

  const { accountId } = useParams();

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:4000/post/account/${accountId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((posts) => {
        setUserPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [accountId]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AuthorPageTop accountId={accountId} />
        <Box sx={{ mt: 8 }}>
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
            View Posts ({userPosts.length})
          </Typography>
        </Box>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 1,
          }}
        >
          {loading ? (
            <Box
              sx={{
                mt: "150px",
                display: "flex",
                justifyContent: "center",
              }}
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
                // justifyContent: "center",
                maxWidth: "700px",
                width: "100%",
                // height: "80vh",
                // overflowY: "auto",
                // border: "solid 1px black",
              }}
            >
              {userPosts.length > 0 ? (
                userPosts.map((post) => {
                  return (
                    <DisplayAuthorPage
                      key={post._id}
                      {...post}
                      loginUserId={userId}
                    />
                  );
                })
              ) : (
                <Typography variant="body1" sx={{ mt: 4, ml: 4 }}>
                  No Post found.
                </Typography>
              )}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default AuthorPage;
