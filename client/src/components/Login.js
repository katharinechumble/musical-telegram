import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Form, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";

const Login = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // execute the loginUser mutation and pass in variable data from the form
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <div className="login-style">
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Alert
            id="login-alert"
            className="login-style"
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your login credentials!
          </Alert>
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your username"
              name="username"
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </Form.Group>
          <Button
            disabled={!(userFormData.username && userFormData.password)}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
