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
import UserContext from './UserContext';
import JoblyApi from '../api';

function EditUserForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const INITIAL_STATE = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    password: '',
    email: currentUser.email,
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  async function updateUser(username, userData) {
    try {
      const user = await JoblyApi.updateUser(username, userData);
      return { success: true, user };
    } catch (errors) {
      console.error('user update failed', errors);
      setFormErrors(errors);
      return { success: false, errors };
    }
  }

  /** On submit, update user info on backend and display any errors.
   *  if successful
   *  - show success update message
   *  - update current user info throughout site
   *  - clear previous form errors and password
   */
  async function handleSubmit(event) {
    event.preventDefault();
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      email: formData.email,
    };

    const result = await updateUser(currentUser.username, profileData);

    if (result.success) {
      setFormData((data) => ({ ...data, password: '' }));
      setFormErrors([]);
      setCurrentUser(result.user);
      setUpdateSuccess(true);
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
            <Input value={currentUser.username} disabled readOnly />
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
        {updateSuccess ? (
          <Alert color='success'>Successfully Updated Profile</Alert>
        ) : null}
        <Button color='primary'>Submit</Button>
      </Form>
    </Container>
  );
}

export default EditUserForm;
