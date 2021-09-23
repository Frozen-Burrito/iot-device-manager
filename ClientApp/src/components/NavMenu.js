import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <Navbar className="box-shadow mb-3" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Device Registry</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-content" className="mr-2" />
          <Navbar.Collapse id="navbar-content">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/devices">Devices</Nav.Link>
              <Nav.Link as={Link} to="/devices/add" className="btn btn-primary text-white">Add a Device</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
