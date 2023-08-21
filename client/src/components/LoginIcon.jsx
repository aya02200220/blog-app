import styles from "../styles/main.module.scss";
import { Box, Avatar } from "@mui/material/";

export const LoginIcon = (props) => {
  const defaultSize = "40px";

  return (
    <>
      <Avatar
        src={props.userIcon}
        sx={{
          height: {
            // xs: props.size ? "100px" : defaultSize,
            xs: props.size ? "130px" : defaultSize,
            md: props.size || defaultSize,
          },
          minWidth: {
            // xs: props.size ? "100px" : defaultSize,
            xs: props.size ? "130px" : defaultSize,
            md: props.size || defaultSize,
          },
          fontSize: props.size ? "55px" : "15px",
          font: "#fff",
          // marginRight: "5px",
          border: "solid 1px #B8AA93",
          backgroundColor: "#da8dea",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "600",
          // paddingBottom: "2px",
        }}
      >
        {props.firstLetter}
        {props.lastLetter}
      </Avatar>
    </>
  );
};
