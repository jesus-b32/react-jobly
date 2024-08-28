import React from 'react';
import { useState } from 'react';
import { Form, Input, Button } from 'reactstrap';

function SearchBox({ updateFilter }) {
  const INITIAL_STATE = {
    searchTerm: '',
  };

  const [formData, setFormData] = useState('');

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
      <Form onSubmit={handleSubmit}>
        <Input
          id='searchFilter'
          name='searchFilter'
          type='text'
          placeholder='Enter search term'
          value={formData.searchTerm}
          onChange={handleChange}
        />
        <Button>Submit</Button>
      </Form>
    </>
  );
}

export default SearchBox;
