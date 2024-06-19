
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import Bot from './Bot';
import { useState } from 'react';
import Logo from "../assets/images/parrot.png";

function Navbars() {

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <Navbar expand="lg" className=" p-2  " style={{  background:"#6495ED" }}>

            <Navbar.Brand href="/">
                <div className='d-flex align-items-center text-white'>
                    <img src={Logo} width={30} height={30} alt='Logo'/>
                    <h4 className="m-0">LearnEase</h4>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto text-center "> 
                    <Nav.Link className='text-white' href="/dashboard">Features</Nav.Link>
                    <Nav.Link className='text-white' href="/plan">Study Plans</Nav.Link>
                    <Nav.Link className='text-white' href="/chat-pdf">Chat with pdf</Nav.Link>
                    <Nav.Link className='text-white' href="/chat">Tutor Bot</Nav.Link>
                    <Nav.Link className='text-white' href="/quiz">Quiz</Nav.Link>
                    <Nav.Link className='text-white' href="/summary">Youtube Summary</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Nav className="me-auto">
                <DropdownButton
                    className=''
                    variant="secendary"
                    title={
                        <div className='d-inline-flex align-items-center border rounded-circle overflow-hidden' style={{ width: '35px', height: '35px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                        </div>}>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/">Logout</Dropdown.Item>
                </DropdownButton>
            </Nav>
        </Navbar>
    );
}

export default Navbars;
