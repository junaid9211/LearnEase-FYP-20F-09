import React, { useState } from 'react';
import {Button, Card, Container, FloatingLabel, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavLanding from "./NavLanding";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded credentials check
    if (email === 'junaidgohan123@gmail.com' && password === 'junaid786') {
      navigate('/dashboard');
    } else {
      alert('Incorrect email and/or password');
    }
  };

  return (
      <>
        <NavLanding />

          <Row className='p-4'> </Row>
          <Row className='p-4'> </Row>
          <Row className='p-4'> </Row>
          <Row className='p-4'> </Row>

    <div>
      <div className='pt-3 text-center'>
        <h2 className="animated-text text-success" style={{ fontWeight: "bold", fontSize: "50px" }}>LearnEase</h2>
        <p style={{ fontWeight: "20px", fontSize: "16px" }}>Your Study Coordinator</p>
      </div>
      <Container fluid className='d-flex align-items-center justify-content-center text-center '>
        <Card className='shadow' style={{}}>
          <Card.Body className='px-5'>
            <h6 className="text-uppercase text-center p-4">Sign In</h6>
            <Form onSubmit={handleLogin}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <Button className='m-3 w-100' variant='success' size='lg' type="submit">Sign In</Button>
              <p className=' ' style={{ fontSize: '12px' }}>
                Don't have an account?
                <Link to="/signup" className='ms-2'>Sign up</Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
      </>

  );
};

export default Login;
