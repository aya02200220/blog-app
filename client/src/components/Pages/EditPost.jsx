import TextField from "@mui/material/TextField";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Box, IconButton, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true); // add this line
  const [editorHeight, setEditorHeight] = useState("180px");

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setLoading(false); // add this line
      });
    });
  }, []);

  // if (loading) {
  //   return <CircularProgress />;
  // }

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
    <>
      {loading ? (
        <Box sx={{ mt: "150px", display: "flex", justifyContent: "center" }}>
          <CircularProgress />
          <Typography sx={{ ml: "20px", fontSize: "20px" }}>
            Loading....
          </Typography>
        </Box>
      ) : (
        <>
          <Link to={`/post/` + id}>
            <IconButton
              variant="outlined"
              sx={{
                fontSize: "14px",
                height: "22px",
                borderRadius: 1,
                position: "fixed",
                top: "80px",
                left: { xs: "100px", md: "260px" },
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
              <form onSubmit={updatePost}>
                <TextField
                  fullWidth
                  type="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  placeholder="Title"
                ></TextField>
                <Box mt={1}>
                  <input
                    type="file"
                    onChange={(ev) => setFiles(ev.target.files)}
                  />
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
                  onClick={updatePost}
                >
                  Update Post
                </Button>{" "}
              </form>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default EditPost;
