import styles from "../../styles/main.module.scss";
import TextField from "@mui/material/TextField";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
// import Button2 from "../Buttons/Button";
import Button from "@mui/material/Button";

import { Navigate, useParams } from "react-router-dom";

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

export const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <div className={styles.mainContainer}>
      <form className={styles.postForm} onSubmit={updatePost}>
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
        />

        <Button variant="contained" onClick={updatePost}>
          Update Post
        </Button>
      </form>
    </div>
  );
};
