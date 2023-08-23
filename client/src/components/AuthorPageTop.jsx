import { useState, useEffect } from "react";
import { format } from "date-fns";

import { LoginIcon } from "./LoginIcon";
import { Box, Container, Typography } from "@mui/material";
import { FetchUser } from "./Functions/FetchUser";
import CakeIcon from "@mui/icons-material/Cake";

export const AuthorPageTop = ({ accountId }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userIcon, setUserIcon] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userBio, setUserBio] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await FetchUser(accountId);
        if (userInfo) {
          setFirstName(userInfo.user.firstName);
          setLastName(userInfo.user.lastName);
          setUserIcon(userInfo.user.userIcon);
          setUserId(userInfo.user._id);
          setUserBio(userInfo.user.bio || "This user hasn't added a bio yet");
          setCreatedAt(userInfo.user.createdAt);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [accountId]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{
          // border: "solid 1px black",
          width: "790px",
          maxWidth: "790px",
          height: "220px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          // borderRadius: "10px 10px 10px 10px ",
          borderRadius: "10px 10px 0 0",
          backgroundColor: "#d1abab",
          mb: 10,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 15,
            p: 1,
            borderRadius: 100,
            backgroundColor: "#d1abab",
            zIndex: 1,
          }}
        >
          <LoginIcon
            firstLetter={firstName?.charAt(0)}
            lastLetter={lastName?.charAt(0)}
            userIcon={userIcon}
            size={120}
          />
        </Box>
      </Container>
      <Box
        sx={{
          border: "solid 1px #e0e0e0",
          // width: "60%",
          minWidth: "700px",
          maxWidth: "700px",
          height: "250px",
          display: "flex",
          backgroundColor: "#fff",
          borderRadius: "2px 2px 2px 2px",
          position: "absolute",
          top: 85,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mt: { xs: 10, sm: 9 },
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            width: "700px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "25px", sm: "30px" },
              fontWeight: "600",
              color: "#333",
            }}
          >
            {firstName} {lastName}
          </Typography>
          <Typography
            sx={{
              mt: 1,
              ml: 2,
              mr: 2,
              textAlign: "center",
              fontSize: { xs: "15px", sm: "17px" },
              lineHeight: "20px",
              fontWeight: "300",
              color: "#545454",
              maxWidth: "480px",
              wordBreak: "break-word",
              maxHeight: "75px",
              minHeight: "75px",
              overflow: "hidden",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px", // スクロールバーの幅
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#d1abab", // スクロールバーの色
                borderRadius: "3px", // スクロールバーの丸み
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#717171", // ホバー時のスクロールバーの色
              },
            }}
          >
            {userBio}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#717171",
              mt: 1,
            }}
          >
            {" "}
            <CakeIcon />
            <Typography sx={{ ml: 1, fontSize: { xs: "14px", sm: "16px" } }}>
              Joined on{" "}
              {format(new Date(createdAt || "2023-02-20"), "MMM d, yyyy")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
