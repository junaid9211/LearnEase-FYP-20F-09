import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import parrot from "../assets/images/parrot.png"
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import NavLanding from "./NavLanding";

const Signup = () => {
    const [text] = useTypewriter({
        words: ['with my Maths Assignment?', 'understand this complex passage?', 'explore more about python?'],
        loop: true,
        typeSpeed: 100,
        deleteSpeed: 30,
      });

        
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [ageResult, setAgeResult] = useState('');

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    useEffect(() => {
        calculateAge();
    }, [selectedYear]); // Watch for changes in selectedYear

    const calculateAge = () => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - selectedYear;

        if (age >= 12) {
        setAgeResult("");
        } else {
        setAgeResult("You're not allowed to access the app.(10+)");
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
              <Row className='text-center'>
                    <Col lg={5} md={6} sm={12} className='pb-4 '>
                        <h2 className="animated-text p-4 text-success" style={{  fontWeight: "bold", fontSize: "50px"}}>LearnEase</h2>
                        <p style={{  fontWeight: "normal", fontSize: "20px " }}>Your Study Coordinator</p>
                        <img src={parrot} width={300} height={300} alt="Logo" />


                        <div className=''>
                            <h3 style={{  color: "black"}}> Hi, Can you help me {" "}
                            <span className='text-success' style={{ fontWeight: "normal", fontSize: "30px"}}>
                                {text}
                            </span>
                            <span style={{color:"darkgreen"}}> <Cursor /> </span>
                            </h3>
                        </div>
                    </Col>
                    <Col lg={7} md={6} sm={12}>
                    
                        <Container fluid className='d-flex align-items-center justify-content-center'>
                            
                            <Card className='m-5 shadow' style={{}}>
                                <Card.Body className='px-5 '>
                                <h5 className="text-uppercase text-center p-4">Create an account</h5>
                                <Form>
                                    <Row>
                                        <Col className='' lg={6} md={6} sm={12}>
                                            <FloatingLabel
                                            controlId="floatingTextarea"
                                            label="First Name"
                                            className="mb-3"
                                            >
                                                <Form.Control type='name' placeholder="Leave a comment here" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col className='' lg={6} md={6} sm={12}>
                                            <FloatingLabel
                                            controlId="floatingTextarea"
                                            label="Last Name"
                                            className="mb-3"
                                            >
                                                <Form.Control type='name' placeholder="Leave a comment here" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                        className="mb-3"
                                        >
                                        <Form.Control type="email" placeholder="name@example.com" />
                                    </FloatingLabel>
                                    <Row>
                                        <Col lg={6} md={6} sm={12}>
                                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                                <Form.Control type="password" placeholder="Password" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col lg={6} md={6} sm={12}>
                                        
                                            <FloatingLabel controlId="floatingPassword" label="Retype Password" className="mb-3">
                                                <Form.Control type="password" placeholder="Retype Password" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <FloatingLabel controlId="floatingSelect" label="Birth Year" className='mb-2 '>
                                        <Form.Select id="dob" value={selectedYear} onChange={handleYearChange}>
                                            {[...Array(new Date().getFullYear() - 1900 + 1)].map((_, index) => (
                                                <option key={index} value={new Date().getFullYear() - index}>
                                                {new Date().getFullYear() - index}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                    <Button className='m-3 w-100 ' variant='success' size='lg'>Register</Button>
                                    <p className=' ' style={{fontSize:'12px'}}>
                                        Already Registered? 
                                        <Link to="/login" className='ms-2'>Sign in</Link>
                                    </p>
                                </Form>

                                </Card.Body>
                            </Card>
                        </Container>
    
                    </Col>
              </Row>
        </div>
      </>

  )
}

export default Signup
