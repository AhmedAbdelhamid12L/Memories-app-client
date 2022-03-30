// import modules
import React from "react";
import { Route, Routes } from "react-router-dom";
// import styles
import { Container } from "@material-ui/core";
// import components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Container>
  );
}

export default App;
