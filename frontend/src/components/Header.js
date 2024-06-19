import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function Header(){
    return(
        
        <Container>
      
            <Nav className="me-auto justify-content-between p-4">
                <div>
                    <img src={Logo} alt='Logo'/>
                </div>
                <div>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" href="#home">Hero</Nav.Link>
                        <Nav.Link as={Link} to="/contact" >Contact</Nav.Link>
                        <Nav.Link as={Link} to="/" >Home</Nav.Link>
                        <Nav.Link as={Link} to="footer" >Footer</Nav.Link>
                    </Nav>
                </div>
                <div >
                    <Button className='mr-3' type="submit">Create</Button>{'  '}
                    <Button type="submit">Sign In</Button>
                </div>

            </Nav>
        </Container>
    
    );
}

export default Header;

