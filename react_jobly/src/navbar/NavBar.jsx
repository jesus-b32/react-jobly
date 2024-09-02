import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  Collapse,
} from 'reactstrap';

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='mb-4'>
      <Navbar expand={'md'} color='dark' dark>
        <NavbarBrand href='/'>React-Jobly</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {currentUser ? (
            <Nav className='ms-auto'>
              <NavItem className='ms-4'>
                <NavLink to='/companies'>Companies</NavLink>
              </NavItem>
              <NavItem className='ms-4'>
                <NavLink to='/jobs'>Jobs</NavLink>
              </NavItem>
              <NavItem className='ms-4'>
                <NavLink to='/profile'>Profile</NavLink>
              </NavItem>
              <NavItem className='mx-4'>
                <NavLink to='/' onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          ) : (
            <Nav className='ms-auto'>
              <NavItem className='ms-4'>
                <NavLink to='/login'>Login</NavLink>
              </NavItem>
              <NavItem className='mx-4'>
                <NavLink to='/signup'>Sign Up</NavLink>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
