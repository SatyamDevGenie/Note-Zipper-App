import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import "./RegisterScreen.css";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password do not Match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/users",
          { name, pic, email, password },
          config
        );
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  const postDetails = (p) => {
    p.preventDefault();
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className="name">Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="mt-3">
            <Form.Label className="email">Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="email@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label className="password">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mt-3">
            <Form.Label className="password">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="******"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mt-3">
            <Form.Label className="upload">
              {" "}
              Upload your Profile Picture
            </Form.Label>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" onChange={postDetails} />
            </Form.Group>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col style={{ fontFamily: "Arial Black" }}>
            Already have a Account ? <Link to="/login">Login Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;