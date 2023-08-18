import { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

import { FetchProfile } from "../Functions/FetchProfile";
import { LocalStorageRemove, LocalStorage } from "../Functions/LocalStorage";

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

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const ChangeEmail = () => {
  const [loading, setLoading] = useState(true);
  // const [userInfo, setUserInfo] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const { setUserInfo, userInfo } = useContext(UserContext);

  const [showEmail1, setShowEmail1] = useState(false);
  const [showEmail2, setShowEmail2] = useState(false);

  // const toggleEmailVisibility1 = () => {
  //   console.log("switch");
  //   setShowEmail1(!showEmail1);
  // };
  // const toggleEmailVisibility2 = () => {
  //   setShowEmail2(!showEmail2);
  // };

  const updateEmail = async () => {
    if (!currentEmail || !newEmail || !confirmEmail) {
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
      if (newEmail !== confirmEmail) {
        setEmailError("Emails do not match");
        return;
      }

      try {
        setEmailError("");

        const response = await fetch("http://localhost:4000/updateEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentEmail: currentEmail,
            newEmail: newEmail,
          }),
        });

        // トークンなしパシワード変更///////////////////////////////////////////////////
        // const response = await fetch("http://localhost:4000/updateEmail", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     userId: "64bc5d1fe0fec1f8eca46c07",
        //     currentEmail: currentEmail,
        //     newEmail: newEmail,
        //   }),
        // });
        //////////////////////////////////////////////////////////////////////////

        if (!response.ok) {
          // const text = await response.text();
          // errorMsg(text);
          // errorMsg("Incorrect current Email");
          // throw new Error(
          //   `HTTP error! status: ${response.status}, message: ${text}`
          // );
        }

        const updated = await response.json();
        if (updated.success) {
          toast.success("Email updated successfully!");
          setCurrentEmail("");
          setNewEmail("");
          setConfirmEmail("");

          const newUserInfo = await FetchProfile(newEmail);
          setUserInfo(newUserInfo);

          LocalStorageRemove();
          LocalStorage({ userInfo: newUserInfo });
        } else {
          errorMsg(`Failed to update               ${updated.message}`);
        }
      } catch (error) {
        errorMsg(`There was a problem with the Email update operation:
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
                backgroundColor: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ml: 2, mt: 2, mb: 2, fontWeight: "600" }}>
                  {"Account >"}{" "}
                  <MailOutlineIcon sx={{ fontSize: "15px", mb: 0.3 }} /> Change
                  Email Address
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
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {/* //////////////////////////////////////////////////////////////////// */}
                  <Box
                    sx={{
                      width: "85%",
                      mt: 3,
                    }}
                  >
                    <TextField
                      sx={{ mt: 3 }}
                      required
                      fullWidth
                      variant="outlined"
                      id="filled-required"
                      label="Current Email"
                      type={showEmail1 ? "text" : "Email"}
                      value={userInfo ? userInfo.email : currentEmail}
                      onChange={(e) => setCurrentEmail(e.target.value)}
                      placeholder="Current Email"
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       <IconButton onClick={toggleEmailVisibility1}>
                      //         {showEmail1 ? <VisibilityOff /> : <Visibility />}
                      //       </IconButton>
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                    <Divider sx={{ mt: 3 }} />

                    <TextField
                      sx={{ mt: 3 }}
                      required
                      fullWidth
                      variant="outlined"
                      id="filled-required"
                      label="New Email"
                      type={showEmail2 ? "text" : "Email"}
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="New Email"
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       <IconButton onClick={toggleEmailVisibility2}>
                      //         {showEmail2 ? <VisibilityOff /> : <Visibility />}
                      //       </IconButton>
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />

                    <TextField
                      required
                      fullWidth
                      label="ConfirmEmail"
                      type={showEmail2 ? "text" : "Email"}
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      variant="outlined"
                      placeholder="Confirm New Email"
                      sx={{ mt: 2 }}
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       <IconButton onClick={toggleEmailVisibility2}>
                      //         {showEmail2 ? <VisibilityOff /> : <Visibility />}
                      //       </IconButton>
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: "80px",
                        }}
                      ></Box>
                    </Box>
                    <Box sx={{ height: 2 }}>
                      <Typography
                        color="error"
                        sx={{ textAlign: "right", mr: 1 }}
                      >
                        {EmailError}
                      </Typography>
                    </Box>
                    <Button
                      onClick={updateEmail}
                      variant="contained"
                      fullWidth
                      sx={{ height: "55px", mt: 5, mb: 4 }}
                    >
                      Change Email
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
};

export default ChangeEmail;
