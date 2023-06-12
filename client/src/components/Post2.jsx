import styles from "../styles/main.module.scss";
import cardStyle from "../styles/card2.module.css";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Post2 = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <>
      <Link to={`/post/${_id}`}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title={title}
            subheader={formatISO9075(new Date(createdAt))}
          />
          <CardMedia
            component="img"
            height="194"
            image={"http://localhost:4000/" + cover}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {summary}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Link>

      {/* <div className={styles.post}>
        <div className={styles.postImageContainer}>
          <div className={styles.authorContainer}>

          </div>

          <Link to={`/post/${_id}`}>
            <img
              className={styles.postImage}
              src={"http://localhost:4000/" + cover}
              alt=""
            />
          </Link>
        </div>
        <div className={styles.postContents}>
          <Link to={`/post/${_id}`}>
            <h2 className={styles.postTitle}>{title}</h2>
          </Link>

          <div className={styles.info}>
            <div className={styles.author}>{author.userName}</div>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </div>
          <p className={styles.postWriting}>{summary}</p>
        </div>
      </div> */}
    </>
  );
};

export default Post2;
