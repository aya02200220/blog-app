import styles from "../../styles/main.module.scss";
import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
// import Button2 from "../Buttons/Button";
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
    <div className={styles.mainContainer}>
      <form className={styles.postForm} onSubmit={createNewPost}>
        <TextField
          type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.postTitle}
          variant="outlined"
          placeholder="Title"
        ></TextField>
        {/* <TextField
          type="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={styles.postSummary}
          variant="outlined"
          placeholder="Summary"
        ></TextField> */}
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
          formats={formats}
          style={{ height: editorHeight }}
        />
        <Button
          variant="contained"
          sx={{ height: "45px", mt: { xs: 9, sm: 6, md: 6 } }}
        >
          Create Post
        </Button>{" "}
      </form>
    </div>
  );
};

export default CreatePost;
