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
        marginRight: "5px",

        backgroundColor: "#da8dea",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "600",
        paddingBottom: "2px",
      }}
    >
      {props.firstLetter}
      {props.lastLetter}
    </Box>
  );
};
