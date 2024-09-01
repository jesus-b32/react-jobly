import React from 'react';
import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Label,
  FormGroup,
  Col,
  Container,
} from 'reactstrap';

function LoginUserForm({ setisLoggedIn }) {
  const INITIAL_STATE = {
    username: '',
    password: '',
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
    // handleLogin((data) => formData);
    setisLoggedIn(true);
    setFormData(INITIAL_STATE);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} className='mb-4'>
        <FormGroup row>
          <Label for='username' md='auto'>
            Username:
          </Label>
          <Col md='10'>
            <Input
              id='username'
              name='username'
              type='text'
              placeholder='username'
              value={formData.username}
              onChange={handleChange}
              className='mb-4'
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='password' md='auto'>
            Password:
          </Label>
          <Col md='10'>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='password'
              value={formData.password}
              onChange={handleChange}
              className='mb-4'
              required
            />
          </Col>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default LoginUserForm;
