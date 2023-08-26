import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../Constants";

import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  Divider,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // const [userInfo, setUserInfo] = useState("");

  const handleForgotPassword = async () => {
    const id = toast.loading("Please wait...");

    setLoading(true); // Set loading state to true when the button is clicked
    try {
      const response = await fetch(`${SERVER_URL}/password/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.update(id, {
          render: "Reset token sent to email",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setEmail("");
      } else {
        toast.update(id, {
          render: `User ${data.message}`,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: `${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
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
        {/* {!loading ? (
          <Box sx={{ mt: "150px", display: "flex", justifyContent: "center" }}>
            <CircularProgress />
            <Typography sx={{ ml: "20px", fontSize: "20px" }}>
              Loading....
            </Typography>
          </Box>
        ) : ( */}
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
                Forgot your password?
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
                    variant="outlined"
                    id="filled-required"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />

                  <Button
                    onClick={handleForgotPassword}
                    variant="contained"
                    fullWidth
                    sx={{ height: "55px", mt: 3, mb: 5 }}
                    disabled={loading || !email} // Disable the button while loading
                  >
                    <Typography
                      sx={{
                        textTransform: "none",
                        fontWeight: "500",
                        fontSize: { xs: "15px", sm: "18px" },
                        lineHeight: { xs: "13px", sm: "18px" },
                      }}
                    >
                      Send me reset password instructions
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
        {/* )} */}
      </Box>
    </>
  );
}

export default ForgotPassword;
