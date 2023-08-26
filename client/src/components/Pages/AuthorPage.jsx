import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../Constants";

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
    return localUserInfo
      ? localUserInfo.id
        ? localUserInfo.id
        : localUserInfo._id
        ? localUserInfo._id
        : null
      : null;
  });

  const { accountId } = useParams();
  // console.log("accountId", accountId);

  useEffect(() => {
    setLoading(true);

    fetch(`${SERVER_URL}/post/account/${accountId}`, {
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
        <AuthorPageTop accountId={accountId} loginUserId={userId} />

        <Container
          maxWidth={false} // この行を追加
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            mt: 11,
            position: "relative",
            maxWidth: "700px",
            width: "100%",
            "@media (min-width: 600px)": {
              paddingLeft: 0,
              paddingRight: 0,
            },
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
            <>
              <Box
                sx={{
                  alignSelf: "flex-start",
                  color: "#4e575f",
                  fontWeight: "500",
                  fontSize: "25px",
                  lineHeight: "20px",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    // ml: 5,
                    color: "#4e575f",
                    fontWeight: "500",
                    marginTop: 0,
                    fontSize: "25px",
                    lineHeight: "20px",
                    textTransform: "uppercase",
                  }}
                >
                  {userId && accountId === userId ? "Your " : "View "}
                  Posts ({userPosts.length})
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 0,
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  position: "relative",
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
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default AuthorPage;
