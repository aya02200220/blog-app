import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

import { Button, IconButton, Box } from "@mui/material/";

import { Navigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  // const { userInfo } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [editorHeight, setEditorHeight] = useState("180px");

  const createNewPost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();
    const res = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (res.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Link to={`/`}>
        <IconButton
          variant="outlined"
          sx={{
            fontSize: "14px",
            height: "22px",
            borderRadius: 1,
            position: "fixed",
            top: "80px",
            left: { xs: "66px", sm: "100px", md: "260px" },
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          <ArrowBackIcon icon={faPenToSquare} />
          BACK
        </IconButton>
      </Link>
      <Box
        sx={{
          mt: 6,
          ml: { xs: 0, sm: 2 },
          mr: { xs: 0, sm: 2 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "100%" },
            maxWidth: "550px",
            backgroundColor: "#fff",
            border: "1px solid #bfbfbf",
            p: 3,
            borderRadius: 5,
          }}
        >
          <form onSubmit={createNewPost}>
            <TextField
              fullWidth
              type="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              placeholder="Title"
              // sx={{ backgroundColor: "#fff" }}
            ></TextField>
            <Box mt={1}>
              <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
            </Box>
            <Box mt={1}>
              <ReactQuill
                value={content}
                onChange={(newValue) => setContent(newValue)}
                modules={modules}
                formats={formats}
                style={{ height: editorHeight }}
              />
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "45px", mt: { xs: 9, sm: 6, md: 6 } }}
              onClick={createNewPost}
            >
              Create Post
            </Button>{" "}
          </form>
        </Box>
      </Box>
    </>
  );
};

export default CreatePost;
