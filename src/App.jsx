// import modules
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import img
import memories from "./images/memories.png";
// import action
import { getPosts } from "./actions/posts";
// import styles
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles";
// import components
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid className={classes.mainContanier} container justifyContent="space-between" alignItems="stretch">
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid className="p-form" item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;