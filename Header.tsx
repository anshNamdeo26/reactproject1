import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import React from 'react';

const Header = () => {
    const navigate = useNavigate();
    const { userData } = useUser();

    const handleLogout = () => {
        navigate('/login');
        console.log('Logged out');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const headerStyle = {
        position: 'fixed',
        top: '0.5%',
        left: '0',
        width: '100%',
        zIndex: '1000',
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={headerStyle}>
            <Container>
                <Navbar.Brand href="/">Employee Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link onClick={handleProfileClick}>Profile</Nav.Link>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                    {userData && <span style={{ color: 'white', marginRight: '10px' }}>{userData.name}</span>}
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
