import { useState, useEffect, useContext } from "react";
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
  // const [userInfo, setUserInfo] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setUserInfo, userInfo } = useContext(UserContext);

  console.log("Security Page userInfo:", userInfo);

  let initialUserInfo = FetchProfile(userInfo?.email);

  // const isChanged = () => {
  //   return (
  //     userName !== initialUserInfo.email ||
  //     password !== initialUserInfo.password
  //   );
  // };

  // useEffect(() => {
  //   if (initialUserInfo) {
  //     setPassword(initialUserInfo.password);
  //     setUserName(initialUserInfo.email);
  //     setLoading(false);
  //   }
  // }, [userInfo]);

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${text}`
        );
      }

      const updated = await response.json();
      if (updated.success) {
        // パスワードの更新に成功したら、適切なメッセージを表示
        toast.success("Password updated successfully!");
      } else {
        // エラーメッセージを表示
        toast.error("Failed to update password");
      }
    } catch (error) {
      console.error(
        "There was a problem with the password update operation:",
        error.message
      );
    }
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
        {!loading ? (
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
                  // height: { sx: "400px", sm: "200px" },
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
                  {/* //////////////////////////////////////////////////////////////////// */}
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{ fontWeight: "600", mt: 3, textAlign: "center" }}
                    >
                      Change Password
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                      <Box sx={{ width: "100px" }}>
                        <Typography
                          sx={{ fontWeight: "400", fontSize: "15px" }}
                        >
                          Current Password
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <TextField
                          fullWidth
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          variant="outlined"
                          placeholder="Current Password"
                          sx={{ flexGrow: 1 }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                      <Box sx={{ width: "100px" }}>
                        <Typography
                          sx={{ fontWeight: "400", fontSize: "15px" }}
                        >
                          New Password
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <TextField
                          fullWidth
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          variant="outlined"
                          placeholder="New Password"
                        />

                        <TextField
                          fullWidth
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          variant="outlined"
                          placeholder="Confirm New Password"
                        />
                        <Typography color="error">{passwordError}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ m: 2 }}>
                <Button
                  onClick={updatePassword}
                  variant="contained"
                  fullWidth
                  sx={{ height: "40px" }}
                >
                  Change Password
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
