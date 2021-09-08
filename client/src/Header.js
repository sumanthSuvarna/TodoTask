import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

export default function Header(props){
    return(
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">{props.data}</Navbar.Brand>            
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">            
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar> 
    )
}