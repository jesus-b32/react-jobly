import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import UserContext from '../auth/UserContext';

function Homepage() {
  const { currentUser } = useContext(UserContext);
  return (
    <Container fluid>
      <h1>
        <b>Jobly</b>
      </h1>
      <h4>All the jobs in one, convenient place.</h4>
      {currentUser ? (
        <h3>
          <b>{`Welcome Back, ${currentUser.firstName}!`}</b>
        </h3>
      ) : (
        <div>
          <Link className='btn btn-primary font-weight-bold me-3' to='/login'>
            Log in
          </Link>
          <Link className='btn btn-primary font-weight-bold' to='/signup'>
            Sign up
          </Link>
        </div>
      )}
    </Container>
  );
}

export default Homepage;
