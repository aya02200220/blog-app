import { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

import { UserContext } from "../UserContext";
import styles from "../../styles/main.module.scss";
import { Link } from "react-router-dom";
import { GetLocalStorage } from "../Functions/LocalStorage";

import { LocalStorageRemove, LocalStorage } from "../Functions/LocalStorage";
import { FetchProfile } from "../Functions/FetchProfile";

import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Divider,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  console.log("Security Page userInfo:", userInfo);

  // let initialUserInfo = FetchProfile(userInfo?.email);

  const updatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Fill Required Form", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      try {
        setPasswordError("");

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

        // トークンなしパシワード変更///////////////////////////////////////////////////
        // const response = await fetch("http://localhost:4000/updatePassword", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     userId: "64bc5d1fe0fec1f8eca46c07",
        //     currentPassword: currentPassword,
        //     newPassword: newPassword,
        //   }),
        // });
        //////////////////////////////////////////////////////////////////////////

        if (!response.ok) {
          // const text = await response.text();
          // errorMsg(text);
          // errorMsg("Incorrect current password");
          // throw new Error(
          //   `HTTP error! status: ${response.status}, message: ${text}`
          // );
        }

        const updated = await response.json();
        if (updated.success) {
          toast.success("Password updated successfully!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          errorMsg(`Failed to update          ${updated.message}`);
        }
      } catch (error) {
        errorMsg(`There was a problem with the password update operation:
        ${error.message}`);
      }
    }
  };

  const errorMsg = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          mt: 6,
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
                  <Box sx={{ width: "100%", position: "relative" }}>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        mt: 4,
                        textAlign: "center",
                      }}
                    >
                      Change Password
                    </Typography>

                    <TextField
                      sx={{ mt: 3 }}
                      required
                      fullWidth
                      variant="outlined"
                      id="filled-required"
                      label="Current Password"
                      type={showPassword1 ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current Password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility1}>
                              {showPassword1 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Divider sx={{ mt: 3 }} />

                    <TextField
                      sx={{ mt: 3 }}
                      required
                      fullWidth
                      variant="outlined"
                      id="filled-required"
                      label="New Password"
                      type={showPassword2 ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility2}>
                              {showPassword2 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      required
                      fullWidth
                      label="ConfirmPassword"
                      type={showPassword2 ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      variant="outlined"
                      placeholder="Confirm New Password"
                      sx={{ mt: 2 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility2}>
                              {showPassword2 ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: "80px",
                        }}
                      ></Box>
                    </Box>
                    <Typography
                      color="error"
                      sx={{ textAlign: "right", mr: 1 }}
                    >
                      {passwordError}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ m: 3, mt: 4 }}>
                <Button
                  onClick={updatePassword}
                  variant="contained"
                  fullWidth
                  sx={{ height: "50px" }}
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
