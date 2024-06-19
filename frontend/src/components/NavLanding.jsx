
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar } from 'react-bootstrap';

import logo from '../assets/images/parrot.png';
function NavLanding() {

    

    return (
        <Navbar expand="lg" className=" p-3 " fixed="top" style={{  background:"#6495ED" }}>

            <Navbar.Brand href="#">
                <div className='d-flex align-items-center text-white'>
                    <img src={logo} width={30} height={30} alt='Logo'/>
                    <h4 className="m-0">LearnEase</h4>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto text-center "> 
                    <Nav.Link className='text-white' href="/">HOME</Nav.Link>
                    <Nav.Link className='text-white' href="/faqs">FAQS</Nav.Link>

                    
                </Nav>
            </Navbar.Collapse>
            <Nav className="me-auto">
                        <Nav.Link as={Link} className='text-white fw-bold' to="/login" >Log In</Nav.Link>
                        <Link to="/signup" className="text-decoration-none">
                            <Button type="submit" variant="outline-light" >Get Started</Button>
                        </Link>
                    </Nav>
        </Navbar>
    );
}

export default NavLanding;


