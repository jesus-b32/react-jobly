import React from 'react';
import { Container } from 'reactstrap';
import './NotFoundPage.css';

function NotFound() {
  return (
    <Container fluid className='d-flex not-found'>
      <h1>
        <b>Hmmm. I cannot seem to find what you want.</b>
      </h1>
    </Container>
  );
}

export default NotFound;
