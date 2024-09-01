import React from 'react';
import { Container } from 'reactstrap';

function Homepage({ isLoggedIn, username }) {
  return (
    <Container fluid>
      {isLoggedIn ? <h1>{`Welcome ${username}`}</h1> : <h1>Jobly</h1>}
    </Container>
  );
}

export default Homepage;
