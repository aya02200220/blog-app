import styles from "../../styles/main.module.scss";
import TextField from "@mui/material/TextField";
import { MuiFileInput } from "mui-file-input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import Button from "../Buttons/Button";

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
  const [value, setValue] = useState(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const data = new FormData();
  data.set("title", title);
  data.set("summary", summary);
  data.set("content", content);
  data.set("file", files[0]);

  const handleChange = (newValue) => {
    setFiles(newValue);
  };

  const createNewPost = (e) => {
    e.preventDefault();
    console.log(files);
    // fetch("http://localhost:4000/post");
  };

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
        <p>ssss{content}</p>
        <TextField
          type="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={styles.postSummary}
          variant="outlined"
          placeholder="Summary"
        ></TextField>
        <MuiFileInput
          className={styles.postFile}
          value={files}
          onChange={handleChange}
        />
        <ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <Button title="CreatePost" />
      </form>
    </div>
  );
};

export default CreatePost;
