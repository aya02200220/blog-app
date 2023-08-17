import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { UserContext } from "../UserContext";
import styles from "../../styles/main.module.scss";
import { Link } from "react-router-dom";
import { GetLocalStorage } from "../Functions/LocalStorage";

import CircularProgress from "@mui/material/CircularProgress";
import LockIcon from "@mui/icons-material/Lock";

import { LoginIcon } from "../LoginIcon";
import { LocalStorageRemove, LocalStorage } from "../Functions/LocalStorage";
import { FetchProfile } from "../Functions/FetchProfile";

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

const SecurityPage = () => {
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
      // password !== initialUserInfo.password
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
          <Box sx={{ mt: "150px", display: "flex", justifyContent: "center" }}>
            <CircularProgress />
            <Typography sx={{ ml: "20px", fontSize: "20px" }}>
              Loading....
            </Typography>
          </Box>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ml: 2, mt: 2, mb: 2, fontWeight: "600" }}>
                  {"Account >"} <LockIcon sx={{ fontSize: "15px", mb: 0.3 }} />{" "}
                  Security
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

              <Box sx={{ m: 2 }}>
                <Button
                  // onClick={updateUserData}
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

export default SecurityPage;
