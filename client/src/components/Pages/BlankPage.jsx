import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Avatar, Typography, IconButton, Skeleton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const AccountPage = () => {
  return (
    <Box>
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
        <div>LoginPage2 copy</div>
      </Box>
    </Box>
  );
};

export default AccountPage;
