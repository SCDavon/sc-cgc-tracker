import React, { Component } from 'react';
import CGCRequestPage from './CGCRequestPage';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <div>CGC Tracking</div>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#"><Link to="/expert">Experts</Link></NavItem>
              <NavItem eventKey={2} href="#"><Link to="/cgc">CGC</Link></NavItem>
              <NavItem eventKey={3}><Link to="/request">CGC Requests</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
