import React, { useState, useEffect } from "react";

import Home from "./Home";
import About from "./About";
import styled from "styled-components";

import a from "./a.png";

const Container = styled.div`
  background-color: #aaaaaa;
  border: 1px solid blue;
`;

function fetchUsername() {
  const usernames = ["mkie", "june", "jamie"];
  return new Promise((resolve, reject) => {
    const username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(() => {
      resolve(username);
    }, 100);
  });
}

export default function App(props) {
  const [page, setPage] = useState(props.page);

  useEffect(() => {
    window.onpopstate = (e) => {
      setPage(e.state);
    };
  }, []);
  const [username, setUsername] = useState("");
  useEffect(() => {
    fetchUsername().then(setUsername);
  }, []);

  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, "", `/${newPage}`);
    setPage(newPage);
  }
  const PageComponent = page === "home" ? Home : About;
  return (
    <Container>
      <button data-page="home" onClick={onChangePage}>
        Home
      </button>
      <button data-page="about" onClick={onChangePage}>
        About
      </button>
      <img src={a} />
      <PageComponent username={username} />
    </Container>
  );
}
