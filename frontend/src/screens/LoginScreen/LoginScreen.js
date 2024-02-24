import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setLoading(true); // loads before content

      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data)); // store in local storage
      console.log(data);

      setLoading(false); // after loading content
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="email">Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="email@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="password">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="secondary mt-3" type="submit" className="btn">
            Login
          </Button>
        </Form>
        <Row className="py-3">
          <Col style={{ fontFamily: "Arial Black" }}>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;