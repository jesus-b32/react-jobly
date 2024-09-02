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
  FormFeedback,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function NewUserForm({ signup }) {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const [formErrors, setFormErrors] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      setFormData(INITIAL_STATE);
      navigate('/');
    } else {
      setFormErrors(result.errors);
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} className='mb-4'>
        <FormGroup row>
          <Label for='username' lg='1'>
            Username:
          </Label>
          <Col lg='10'>
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
          <Label for='password' lg='1'>
            Password:
          </Label>
          <Col lg='10'>
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
          <Label for='firstName' lg='1'>
            First Name:
          </Label>
          <Col lg='10'>
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
          <Label for='lastName' lg='1'>
            Last Name:
          </Label>
          <Col lg='10'>
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
          <Label for='email' lg='1'>
            Email:
          </Label>
          <Col lg='10'>
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
        {formErrors.length ? (
          <FormFeedback tooltip>{formErrors}</FormFeedback>
        ) : null}
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default NewUserForm;
