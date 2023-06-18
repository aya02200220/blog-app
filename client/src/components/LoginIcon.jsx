import styles from "../styles/main.module.scss";
import Box from "@mui/material/Box";

export const LoginIcon = (props) => {
  return (
    <Box
      sx={{
        height: "40px",
        minWidth: "40px",
        borderRadius: "50px",
        fontSize: "15px",
        font: "#fff",
      }}
      className={styles.loginIcon}
    >
      {props.firstLetter}
      {props.lastLetter}
    </Box>
  );
};
