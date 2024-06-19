import React, { useState } from 'react'
import { Col, Container, Form, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

const StudyPlan = () => {
    const [selectedDays, setSelectedDays] = useState([]);

    const handleCheckboxChange = (value) => {
        setSelectedDays(value);
    };
/*
    To change the color and select
    const isDaySelected = (day) => {
        return selectedDays.includes(day);
    };

    const toggleDayStyle = (day) => {
        return isDaySelected(day) ? 'btn-primary' : 'btn-outline-primary';
    };
*/
  return (
    <Container className='pt-5'>
        <h1 className='pb-3'>Generate Study Plan</h1>
        

        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Topic Name
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="email" placeholder="Enter Topic" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                Duration
                </Form.Label>
                <Col sm={10}>
                    <Form.Select aria-label="Default select example">
                        <option>Select Duration</option>
                        <option value="1">One Week</option>
                        <option value="2">Two Weeks</option>
                        <option value="3">Three Week</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <fieldset>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                    Level
                    </Form.Label>
                    <Col sm={10}>
                    <div className="d-flex flex-row gap-4">
                        <Form.Check
                        type="radio"
                        label="Beginner"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        className="mr-3"
                        />
                        <Form.Check
                        type="radio"
                        label="Intermediate"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        className="mr-3 ml-3"
                        />
                        <Form.Check
                        type="radio"
                        label="Advance"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        className="ml-6"
                        />
                    </div>
                    </Col>
                </Form.Group>
            </fieldset>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                Prioritized Days
                </Form.Label>
                <Col sm={10}>
                <div>
                <ToggleButtonGroup type="checkbox" value={selectedDays} onChange={handleCheckboxChange}>
                    <ToggleButton variant="outline-secondary" value="Sunday">Sunday</ToggleButton>
                    <ToggleButton variant="outline-secondary" value="Monday">Monday</ToggleButton>
                    <ToggleButton variant="outline-secondary" value="Tuesday">Tuesday</ToggleButton>
                    <ToggleButton variant="outline-secondary" value="Wednesday">Wednesday</ToggleButton>
                    <ToggleButton variant="outline-secondary" value="Thursday">Thursday</ToggleButton>
                    <ToggleButton variant="outline-secondary" value="Friday">Friday</ToggleButton>
                    <ToggleButton variant="outline-secondary" value="Saturday">Saturday</ToggleButton>
                </ToggleButtonGroup>
            </div>
                </Col>
            </Form.Group>

            <Form.Group>
            <div className="d-flex flex-row">
                <Form.Label column sm={2}>
                    Notification
                </Form.Label>
                <Col sm={10}>
                
                    <Form.Check 
                        className='m-2'
                        type="switch"
                        id="custom-switch"
                        label=""
                    />
                  
                </Col>
                </div>
            </Form.Group>
    
        </Form>
        
        <div className='d-flex justify-content-end'>
            <button className='d-inline-flex align-items-center border rounded  p-3 ml-5 shadow' style={{ backgroundColor: 'lightblue' }}>
                
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                
            </button>
        </div>
    </Container>
  )
}

export default StudyPlan;
