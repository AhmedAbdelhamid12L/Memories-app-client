// import modules
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import action
import { getPosts } from "../../actions/posts";
// import styles
import { Container, Grow, Grid } from "@material-ui/core";
import useStyles from "./homeStyles"
// import components
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

function Home() {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContanier}
          container
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid className="p-form" item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
