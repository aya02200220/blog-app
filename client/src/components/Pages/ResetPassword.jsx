import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { VerifyPassword } from "../Functions/Verifications";

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

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [loading, setLoading] = useState(true);
  // const [userInfo, setUserInfo] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (passwordError) setPasswordError("");
  }, [newPassword, confirmPassword]);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setPasswordError("Passwords do not match");
      return;
    }

    const resultPW = VerifyPassword(newPassword);
    if (!resultPW) {
      if (!resultPW) {
        const msg = `The password must be more than 8 characters long.`;
        setPasswordError(msg);
      }
      return;
    }

    if (!newPassword || !confirmPassword) {
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
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/password/reset/${resetToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: newPassword,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
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
                backgroundColor: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    ml: { xs: 1, sm: 2 },
                    mt: { xs: 1, sm: 2 },
                    mb: { xs: 1, sm: 2 },
                    fontWeight: "600",
                    fontSize: { xs: 20, sm: 25 },
                    lineHeight: "24px",
                    textAlign: "center",
                  }}
                >
                  Reset Password
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
                }}
              >
                <Box
                  sx={{
                    flexGrow: { xs: "inherit", sm: 1 },
                    ml: 3,
                    mr: 3,
                    width: "90%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {/* //////////////////////////////////////////////////////////////////// */}
                  <Box
                    sx={{
                      width: "85%",
                      mt: 1,
                    }}
                  >
                    <TextField
                      sx={{ mt: 3 }}
                      required
                      fullWidth
                      label="New Password"
                      variant="outlined"
                      id="filled-required"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? (
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
                      sx={{ mt: 3 }}
                      required
                      fullWidth
                      label="Confirm Password"
                      variant="outlined"
                      id="filled-required"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ height: 2 }}>
                      <Typography
                        color="error"
                        sx={{ textAlign: "right", mr: 1 }}
                      >
                        {passwordError}
                      </Typography>
                    </Box>

                    <Button
                      onClick={handlePasswordReset}
                      variant="contained"
                      fullWidth
                      sx={{ height: "55px", mt: 3, mb: 5 }}
                    >
                      <Typography
                        sx={{
                          textTransform: "none",
                          fontWeight: "500",
                          fontSize: { xs: "15px", sm: "18px" },
                          lineHeight: { xs: "13px", sm: "18px" },
                        }}
                      >
                        Reset password
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default ResetPassword;
