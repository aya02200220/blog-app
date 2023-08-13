import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import styles from "../../styles/main.module.scss";
import { Link } from "react-router-dom";
import { GetLocalStorage } from "../Functions/LocalStorage";

import {
  Box,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Textarea from "@mui/joy/Textarea";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { LoginIcon } from "../LoginIcon";

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  // const { setUserInfo, userInfo } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [userIcon, setUserIcon] = useState("");

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfoObj = JSON.parse(userInfoString);
      // setUserInfo(userInfoObj);
      setFirstName(userInfoObj.firstName);
      setLastName(userInfoObj.lastName);
      setBio(userInfoObj.bio);

      console.log("userInfo Account page:", userInfoObj);
      console.log("userInfo Account page:", userInfoObj?.firstName);
      console.log("userInfoObj Account page:", userInfoObj?.lastName);
      console.log("userInfoObj Account page:", userInfoObj?.bio);
      console.log("userInfoObj Account page:", userInfoObj?.userIcon);

      setLoading(false);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <>
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
        {loading ? (
          <h1>dd</h1>
        ) : (
          <>
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
                left: { xs: "60px", sm: "77px", md: "249px", lr: "300px" },
                backgroundColor: "#fff",
                zIndex: 1,
              }}
            >
              <ArrowBackIcon icon={faPenToSquare} />
              BACK
            </IconButton>
            {/* ///////////////////////////////////////////////////////////////////// */}
            <Box
              sx={{
                border: "solid 1px #8c8c8c",
                width: { xs: "90%", sm: "100%" },
                maxWidth: "550px",
                borderRadius: "5px",
              }}
            >
              <Box>
                <Typography sx={{ ml: 2, mt: 2, mb: 2, fontWeight: "600" }}>
                  Profile
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: { xs: "flex" },
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: { sx: "400px", sm: "200px" },
                }}
              >
                <Box
                  sx={{
                    ml: { xs: 0, sm: 3 },
                    mt: 3,
                    mb: 3,
                  }}
                >
                  <LoginIcon
                    userIcon={userIcon}
                    size={"150px"}
                    firstLetter={firstName.charAt(0)}
                    lastLetter={lastName.charAt(0)}
                  />
                </Box>
                <Box
                  sx={{
                    flexGrow: { xs: "inherit", sm: 1 },
                    ml: 3,
                    mr: 3,
                    width: "90%",
                  }}
                >
                  <Typography sx={{ fontWeight: "500" }}>First Name</Typography>
                  <TextField
                    fullWidth
                    type="title"
                    value={firstName}
                    // onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    placeholder="firstName"
                  ></TextField>
                  <Typography sx={{ fontWeight: "500" }}>Last Name</Typography>
                  <TextField
                    fullWidth
                    type="title"
                    value={lastName}
                    // onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    placeholder="firstName"
                    className={styles.customHeight}
                  ></TextField>
                </Box>
              </Box>
              <Box sx={{ ml: 2, mr: 2, mb: 2 }}>
                <Typography sx={{ fontWeight: "600" }}>Bio</Typography>
                <Textarea minRows={4} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default AccountPage;
