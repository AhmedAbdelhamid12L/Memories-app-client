// import modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styles
import FileBase64 from "../File-Base64/react-file-base64";
import useStyles from "./formStyles";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
// import action
import { createPost, updatePost } from "../../actions/posts";

function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
    tags: "",
  });
  const classes = useStyles();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id == currentId) : 0
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      selectedFile: "",
      tags: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId == 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  return (
    <>
      {!user?.result?.name ? (
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please Sign In To Create Your Own Memories and Like Other's
            Memories.
          </Typography>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <form
            autoComplete="off"
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
          >
            <Typography variant="h6">
              {" "}
              {currentId ? "Editing" : "Creating"} a Memory
            </Typography>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <TextField
              name="message"
              variant="outlined"
              label="Message"
              fullWidth
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
            <TextField
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",") })
              }
            />
            <div className={classes.fileInput}>
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </form>
          <Button
            onClick={() => clear()}
            variant="contained"
            color="secondary"
            size="small"
            type="submit"
            fullWidth
          >
            Clear
          </Button>
        </Paper>
      )}
    </>
  );
}

export default Form;
