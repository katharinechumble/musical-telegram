import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";

// import { loginUser } from '../utils/API';
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
			<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
				<Alert
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
					<Form.Control.Feedback type="invalid">
						Username Is Required!
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group>
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Your password"
						name="password"
						onChange={handleInputChange}
						value={userFormData.password}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Password is required!
					</Form.Control.Feedback>
				</Form.Group>
				<Button
					disabled={!(userFormData.username && userFormData.password)}
					type="submit"
					variant="success"
				>
					Submit
				</Button>
			</Form>
		</>
	);
};

export default Login;
