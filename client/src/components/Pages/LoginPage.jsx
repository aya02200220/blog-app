// import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";

import { login } from "../Functions/Login";
import FetchBackgroungImage from "../Functions/FetchBackgroundImage";

import { Button, InputAdornment, IconButton } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled, alpha } from "@mui/material/styles";
import { toast } from "react-toastify";

import { UserContext } from "../UserContext";

const inputPropsSx = {
  borderRadius: 100,
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: 10,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  backgroundColor: alpha("#fff", 0.3),
  "& .MuiInputBase-input": {
    color: "#454545", //入力文字の色
  },
};

const inputLabelPropsSx = {
  color: "#fff",
  "&.Mui-focused": {
    color: "#fff",
  },
};

function Copyright(props) {
  return (
    <Typography align="center" zIndex={1} {...props}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        MERN-Blog
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Background = styled("div")(({ backgroundImageUrl }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: 0,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);

  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  const fetchBackgroundImage = FetchBackgroungImage();

  useEffect(() => {
    async function updateBackgroundImage() {
      const img = await fetchBackgroundImage();
      // console.log("img:", img);
      setBackgroundImageUrl(img);
    }
    updateBackgroundImage();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const callLogin = async (e) => {
    e.preventDefault();

    if (!password || !email) {
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

    const userInfo = await login(email, password);
    // console.log("Call Login");
    if (userInfo) {
      setUserInfo(userInfo);
      setRedirect(true);
      // console.log("Call Login userInfo:", userInfo);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      {backgroundImageUrl && (
        <Background backgroundImageUrl={backgroundImageUrl} />
      )}

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          mt: { xs: 0, sm: 10 },
          zIndex: 2,
          position: "relative",
          backgroundColor: alpha("#fff", 0.1),
          p: 3,
          borderRadius: 3,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            sx={{ color: "#fff", zIndex: 1, fontSize: "30px" }}
          >
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={callLogin} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{ sx: inputPropsSx }}
                  InputLabelProps={{ sx: inputLabelPropsSx }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    sx: inputPropsSx,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility}>
                          {showPassword ? (
                            <VisibilityOff sx={{ color: "#fff" }} />
                          ) : (
                            <Visibility sx={{ color: "#fff" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ sx: inputLabelPropsSx }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                height: "50px",
                borderRadius: 10,
                backgroundColor: "#E2808A",
                "&:hover": {
                  backgroundColor: "#C75D6A",
                },
              }}
            >
              Sign In
            </Button>

            <Box sx={{ zIndex: 2, position: "relative" }}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to="/register"
                    style={{ color: "#fff", fontWeight: "300" }}
                  >
                    Create a new account?
                  </Link>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to="/password/forgot"
                    sx={{ color: "#fff", fontWeight: "300" }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5, color: "#fff" }} />
        </Box>
      </Container>
    </>
  );
}
