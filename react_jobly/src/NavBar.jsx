import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  Collapse,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='mb-4'>
      <Navbar color='dark' dark container='fluid' expand='md'>
        <NavbarBrand href='/'>Jobly</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {isLoggedIn ? (
            <Nav className='me-auto' navbar>
              <NavItem>
                <Link to={'/companies'}>Companies</Link>
              </NavItem>
              <NavItem>
                <Link to={'/jobs'}>Jobs</Link>
              </NavItem>
              <NavItem>
                <Link to={'/profile'}>Profile</Link>
              </NavItem>
              <NavItem>
                <Link to={'/logout'}>Log Out</Link>
              </NavItem>
            </Nav>
          ) : (
            <Nav className='me-auto' navbar>
              <NavItem>
                <Link to={'/login'}>Login</Link>
              </NavItem>
              <NavItem>
                <Link to={'/signup'}>Sign Up</Link>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
