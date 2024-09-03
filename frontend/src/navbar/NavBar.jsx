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
                <NavLink
                  to='/companies'
                  className='text-decoration-none text-white bg-dark'
                >
                  Companies
                </NavLink>
              </NavItem>
              <NavItem className='ms-4'>
                <NavLink
                  to='/jobs'
                  className='text-decoration-none text-white bg-dark'
                >
                  Jobs
                </NavLink>
              </NavItem>
              <NavItem className='ms-4'>
                <NavLink
                  to='/profile'
                  className='text-decoration-none text-white bg-dark'
                >
                  Profile
                </NavLink>
              </NavItem>
              <NavItem className='mx-4'>
                <NavLink
                  to='/'
                  onClick={logout}
                  className='text-decoration-none text-white bg-dark'
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          ) : (
            <Nav className='ms-auto'>
              <NavItem className='ms-4'>
                <NavLink
                  to='/login'
                  className='text-decoration-none text-white bg-dark'
                >
                  Login
                </NavLink>
              </NavItem>
              <NavItem className='mx-4'>
                <NavLink
                  to='/signup'
                  className='text-decoration-none text-white bg-dark'
                >
                  Sign Up
                </NavLink>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
