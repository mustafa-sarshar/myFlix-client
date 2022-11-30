// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Import Styles
import "./loginView.scss";

// Import Bootstrap Components
import { Button, Form } from "react-bootstrap";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // Control the elements
  const [isFetching, setIsFetching] = useState(false);

  // validate user inputs
  const validate = () => {
    let isReq = true;

    // Reset Errors
    setUsernameErr("");
    setPasswordErr("");

    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be at least 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (DEBUG) console.log("username:", username, "password:", password);

    const isReq = validate();
    if (isReq) {
      setIsFetching(true);
      /* Send a request to the server for authentication */
      axios
        .post("https://musto-movie-api.onrender.com/login", null, {
          // .post("http://localhost:8080/login", null, {
          params: {
            username: username,
            pass: password,
          },
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.error(e.message);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  };
  const handleRequestRegister = (evt) => {
    evt.preventDefault();
    if (DEBUG) console.log("Sign In Request");
    /* Send a request to the server for registration */
    props.onRequestRegister();
  };
  return (
    <>
      <h1 className="login-title">Login 😊</h1>
      <Form autoComplete="on">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            value={username}
            disabled={isFetching}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">*required</Form.Text>
          {/* code added here to display validation error */}
          {usernameErr && (
            <p className="login-form__error">{usernameErr}</p>
          )}{" "}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            autoComplete="on"
            value={password}
            disabled={isFetching}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">*required</Form.Text>
          {/* code added here to display validation error */}
          {passwordErr && <p className="login-form__error">{passwordErr}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formButtonSubmit">
          <Button
            variant="primary"
            type="submit"
            disabled={isFetching}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
