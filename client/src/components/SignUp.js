import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

const SignUp = () => {
  // setting up initial form state
  const [userFormData, setUserFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  //set state for form validation
  const [validated] = useState(false);

  //set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // define adding user
  const [createUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // ensuring form has all information input
    const form = event.currentTarget;

    if (form.checkValidity() === false);
    {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert
        dismissable
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant="danger"
      >
        There was a problem with signing up! Please try again!
      </Alert>
      <Form.Group>
        <Form.Label htmlFor="firstname">First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name"
          name="firstname"
          onChange={handleInputChange}
          value={userFormData.firstname}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter your first name!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="lastname">Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          name="lastname"
          onChange={handleInputChange}
          value={userFormData.lastname}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter your last name!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a username!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email address!
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="text"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a password!
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        disabled={
          !(
            userFormData.firstname &&
            userFormData.lastname &&
            userFormData.username &&
            userFormData.email &&
            userFormData.password
          )
        }
        type="submit"
        variant="success"
      >
        submit
      </Button>
    </Form>
  );
};

export default SignUp;
