import React, { useState } from "react";
import { Navbar, Container } from "react-bootstrap";

import Auth from "../utils/auth";

const AppNavbar = () => {
  return (
    <>
      <Navbar>
        <Container fluid>Holiday Chaos Coordinator.</Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
