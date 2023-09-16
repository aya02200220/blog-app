import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { login } from "../Functions/Login";
import FetchBackgroungImage from "../Functions/FetchBackgroundImage";
import { VerifyPassword, VerifyEmailAddress } from "../Functions/Verifications";
import { SERVER_URL } from "../../Constants";

import { Button, InputAdornment, IconButton, Divider } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import { toast } from "react-toastify";

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
const inputPropsSxError = {
  borderRadius: 100,
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: 10,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D23944",
  },
  backgroundColor: alpha("#D23944", 0.8),
  "& .MuiInputBase-input": {
    color: "#454545", //入力文字の色
  },
};

const inputPropsSxAutofill = {
  "&&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
    {
      backgroundColor: "transparent", //オートフィルの背景色を透明に設定
      borderColor: "transparent", //オートフィルの境界線の色を透明に設定
      boxShadow: "0 0 0 1000px transparent inset", //背景の境界線を透明に設定
      color: "#454545", //オートフィルされたテキストの色を指定
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

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  const fetchBackgroundImage = FetchBackgroungImage();

  const mergedPropsSx = emailError
    ? { ...inputPropsSxError, ...inputPropsSxAutofill }
    : { ...inputPropsSx, ...inputPropsSxAutofill };

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

  useEffect(() => {
    if (passwordError) setPasswordError("");
  }, [password, confirmPassword]);

  useEffect(() => {
    if (emailError) setEmailError("");
  }, [email]);

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setPasswordError("Passwords do not match");
      return;
    }

    const resultPW = VerifyPassword(password);
    const resultEmail = VerifyEmailAddress(email);
    if (!resultPW || !resultEmail) {
      if (!resultPW) {
        const msg = `The password must be more than 8 characters long.`;
        setPasswordError(msg);
      }
      if (!resultEmail) {
        const msg = `Invalid email address`;
        setEmailError(msg);
      }
      return;
    }

    if (passwordError || emailError) return;

    if (!password || !confirmPassword || !firstName || !lastName || !email) {
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

    const data = await fetch(`${SERVER_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { "content-Type": "application/json" },
    });
    if (data.status === 200) {
      callLogin();
      toast.success("You are successfully registered!");
    } else {
      toast.error("Registration failed");
      // alert("Registration failed");
    }
  };

  const callLogin = async (e) => {
    // e.preventDefault();

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{ sx: inputPropsSx }}
                  InputLabelProps={{ sx: inputLabelPropsSx }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  InputProps={{ sx: inputPropsSx }}
                  InputLabelProps={{ sx: inputLabelPropsSx }}
                />
              </Grid>
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
                    sx: mergedPropsSx,
                  }}
                  InputLabelProps={{ sx: inputLabelPropsSx }}
                />
                <Box sx={{ height: 2, zIndex: 2, position: "relative" }}>
                  <Typography
                    color="error"
                    sx={{
                      textAlign: "right",
                      mr: 1,
                      fontWeight: "600",
                      lineHeight: "15px",
                      mt: "2px",
                    }}
                  >
                    {emailError}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} mt={3}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    ...(passwordError
                      ? { sx: inputPropsSxError }
                      : { sx: inputPropsSx }),
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Confirm password"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  id="Confirm password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    ...(passwordError
                      ? { sx: inputPropsSxError }
                      : { sx: inputPropsSx }),
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
                <Box sx={{ height: 2, zIndex: 2, position: "relative" }}>
                  <Typography
                    color="error"
                    sx={{
                      textAlign: "right",
                      mr: 1,
                      fontWeight: "600",
                      lineHeight: "15px",
                      mt: "2px",
                    }}
                  >
                    {passwordError}
                  </Typography>
                </Box>
              </Grid>

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                height: "50px",
                borderRadius: 10,
                backgroundColor: "#E2808A",
                "&:hover": {
                  backgroundColor: "#C75D6A",
                },
              }}
            >
              Sign Up
            </Button>
            <Box sx={{ zIndex: 2, position: "relative" }}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" sx={{ color: "#fff", fontWeight: "300" }}>
                    Already have an account?
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
