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

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='mb-4'>
      <Navbar color='dark' dark container='fluid' expand='md'>
        <NavbarBrand href='/'>Jobly</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='me-auto' navbar>
            <NavItem>
              <NavLink href='/login'>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/signup'>Sign Up</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
