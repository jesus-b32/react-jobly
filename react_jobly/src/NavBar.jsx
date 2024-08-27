import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';

function NavBar() {
  return (
    <div>
      <Navbar expand='md'>
        <NavLink exact to='/' className='navbar-brand'>
          Jobly
        </NavLink>

        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink to='/login'>Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/signup'>Sign Up</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
