// import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { login } from "../Functions/Login";
import FetchBackgroungImage from "../Functions/FetchBackgroundImage";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, styled, alpha } from "@mui/material/styles";

import { UserContext } from "../UserContext";

function Copyright(props) {
  return (
    <Typography align="center" zIndex={1} {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
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

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  const fetchBackgroundImage = FetchBackgroungImage();

  useEffect(() => {
    async function updateBackgroundImage() {
      const img = await fetchBackgroundImage();
      console.log("img:", img);
      setBackgroundImageUrl(img);
    }
    updateBackgroundImage();
  }, []);

  const callLogin = async (e) => {
    e.preventDefault();

    const userInfo = await login(email, password);
    console.log("Call Login");
    if (userInfo) {
      setUserInfo(userInfo);
      setRedirect(true);
      console.log("Call Login userInfo:", userInfo);
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

      <Container component="main" maxWidth="xs" sx={{ mt: 15, zIndex: 2 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
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
                  InputProps={{
                    sx: {
                      borderRadius: 100,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: 10,
                      },
                      backgroundColor: alpha("#fff", 0.3),
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: 100,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: 10,
                      },
                      backgroundColor: alpha("#fff", 0.3),
                    },
                  }}
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
              }}
            >
              Sign In
            </Button>

            <Box sx={{ zIndex: 2, position: "relative" }}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/register"
                    sx={{ color: "#fff", fontWeight: "400" }}
                  >
                    Create a new account? Register
                  </Link>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/forgotPassword"
                    sx={{ color: "#fff", fontWeight: "400" }}
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
