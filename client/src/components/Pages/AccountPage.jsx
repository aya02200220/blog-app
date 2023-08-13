import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { UserContext } from "../UserContext";
import styles from "../../styles/main.module.scss";
import { Link } from "react-router-dom";
import { GetLocalStorage } from "../Functions/LocalStorage";
import { LoginIcon } from "../LoginIcon";
import { LocalStorageRemove, LocalStorage } from "../Functions/LocalStorage";
import { FetchProfile } from "../Functions/FetchProfile";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Avatar,
  Button,
  Typography,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Textarea from "@mui/joy/Textarea";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const AccountPage = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [userIcon, setUserIcon] = useState("");

  let initialUserInfo = GetLocalStorage();

  const isChanged = () => {
    return (
      firstName !== initialUserInfo.firstName ||
      lastName !== initialUserInfo.lastName ||
      bio !== initialUserInfo.bio ||
      userName !== initialUserInfo.email ||
      userIcon !== initialUserInfo.userIcon
    );
  };

  useEffect(() => {
    if (initialUserInfo) {
      setFirstName(initialUserInfo.firstName);
      setLastName(initialUserInfo.lastName);
      setUserName(initialUserInfo.email);
      setBio(initialUserInfo.bio);
      setUserIcon(initialUserInfo.userIcon);
      setLoading(false);
    }
  }, [userInfo]);

  const updateUserData = async () => {
    if (isChanged()) {
      try {
        const response = await fetch("http://localhost:4000/updateProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            userIcon: userIcon,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${text}`
          );
        }

        const updatedInfo = await response.json();
        // ユーザー情報を再取得
        const newUserInfo = await FetchProfile(updatedInfo.user.email);
        setUserInfo(newUserInfo);
        setFirstName(newUserInfo.firstName);
        setLastName(newUserInfo.lastName);
        setUserName(newUserInfo.email);
        setBio(newUserInfo.bio);
        setUserIcon(newUserInfo.userIcon);

        LocalStorageRemove();
        LocalStorage({ userInfo: newUserInfo });
      } catch (error) {
        console.error(
          "There was a problem with the update operation:",
          error.message
        );
      }
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserIcon(reader.result);
    };

    reader.readAsDataURL(file);
  };

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
                    position: "relative",
                  }}
                >
                  <LoginIcon
                    userIcon={userIcon}
                    size={"150px"}
                    firstLetter={firstName.charAt(0)}
                    lastLetter={lastName.charAt(0)}
                  />
                  <Box
                    sx={{
                      // border: "solid 1px black",
                      display: "flex",
                      borderRadius: "100%",
                      position: "absolute",
                      top: 0,
                      left: -1,
                      backgroundColor: alpha("#fff", 0.5),
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      sx={{ height: "100%", width: "100%" }}
                    >
                      <input
                        id="upload-image"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleFileUpload}
                      />
                      <Box sx={{ width: "90%", pt: 5 }}>
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "15px",
                            lineHeight: "14px",
                          }}
                        >
                          Click to Upload Image
                        </Typography>
                        <PhotoCamera />
                      </Box>
                    </IconButton>
                  </Box>
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
                    // type="title"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="outlined"
                    placeholder="firstName"
                  ></TextField>
                  <Typography sx={{ fontWeight: "500" }}>Last Name</Typography>
                  <TextField
                    fullWidth
                    // type="title"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    placeholder="firstName"
                    className={styles.customHeight}
                  ></TextField>
                </Box>
              </Box>
              <Box sx={{ ml: 2, mr: 2, mb: 2 }}>
                <Typography sx={{ fontWeight: "600" }}>Bio</Typography>
                <Textarea
                  minRows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Box>

              <Box sx={{ m: 2 }}>
                <Button
                  onClick={updateUserData}
                  disabled={!isChanged()}
                  variant="contained"
                  fullWidth
                  sx={{ height: "40px" }}
                >
                  UPDATE
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default AccountPage;
