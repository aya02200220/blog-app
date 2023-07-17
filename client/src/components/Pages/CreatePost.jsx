import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import Button from "@mui/material/Button";

import Box from "@material-ui/core/Box";

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

  // console.log(userInfo.id === undefined);
  // if (!userInfo.id === undefined) {
  //   setLoginCheck(true);
  // }

  // useEffect(() => {
  //   if (!loginCheck) {
  //     setRedirect(true);
  //   }
  // }, [loginCheck]);

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <Box
      sx={{
        mt: 15,
        ml: 2,
        mr: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "550px" }}>
        <form onSubmit={createNewPost}>
          <TextField
            fullWidth
            type="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            placeholder="Title"
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
  );
};

export default CreatePost;
