import React, { useState, useContext } from 'react';
import {
  Form,
  Input,
  Button,
  Container,
  Col,
  FormGroup,
  Label,
  Alert,
} from 'reactstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from './UserContext';

function NewUserForm({ signup }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  /**redirect to homepage if already logged in */
  if (currentUser) return <Navigate to={'/'} />;

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

  /** On submit, register new user on backend and display any errors.
   *  if successful
   *  - redirect to homepage
   */
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await signup(formData);
    if (result.success) {
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
        {formErrors.length ? <Alert color='danger'>{formErrors}</Alert> : null}
        <Button color='primary'>Submit</Button>
      </Form>
    </Container>
  );
}

export default NewUserForm;
