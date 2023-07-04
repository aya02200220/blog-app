import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@material-ui/core/Avatar";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export const FavPost = ({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) => {
  const time = format(new Date(createdAt), "yyyy-MM-dd");
  return (
    <Link to={`/post/${_id}`}>
      <Card sx={{ maxWidth: 300, mb: 2 }}>
        <CardMedia
          sx={{ height: 140, maxHeight: 140, width: 300, maxWidth: 300 }}
          image={"http://localhost:4000/" + cover}
        />

        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "17px",
              m: 0,
              textAlign: "center",
              padding: 0,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
          >
            Posted:{time}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
