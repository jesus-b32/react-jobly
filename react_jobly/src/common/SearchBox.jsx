import React from 'react';
import { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'reactstrap';

function SearchBox({ updateFilter }) {
  const INITIAL_STATE = {
    searchTerm: '',
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateFilter((filter) => formData.searchTerm);
    setFormData(INITIAL_STATE);
  }
  return (
    <>
      <Form onSubmit={handleSubmit} className='mb-4'>
        <Row className='d-flex align-items-center justify-content-center'>
          <Col xs='9'>
            <Input
              id='searchTerm'
              name='searchTerm'
              type='text'
              placeholder='Enter search term'
              value={formData.searchTerm}
              onChange={handleChange}
            />
          </Col>
          <Col xs='auto'>
            <Button>Submit</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default SearchBox;
