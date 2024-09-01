import React from 'react';
import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Container,
  Col,
  FormGroup,
  Label,
} from 'reactstrap';

function NewUserForm() {
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
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
    setFormData(INITIAL_STATE);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} className='mb-4'>
        <FormGroup row>
          <Label for='username' md='2'>
            Username:
          </Label>
          <Col md='10'>
            <Input
              id='username'
              name='username'
              type='text'
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='password' md='2'>
            Password:
          </Label>
          <Col md='10'>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='firstName' md='2'>
            First Name:
          </Label>
          <Col md='10'>
            <Input
              id='firstName'
              name='firstName'
              type='text'
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='lastName' md='2'>
            Last Name:
          </Label>
          <Col md='10'>
            <Input
              id='lastName'
              name='lastName'
              type='text'
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='email' md='2'>
            Email:
          </Label>
          <Col md='10'>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default NewUserForm;
