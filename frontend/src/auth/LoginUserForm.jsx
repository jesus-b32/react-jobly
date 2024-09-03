import React, { useState, useContext } from 'react';
import {
  Form,
  Input,
  Button,
  Label,
  FormGroup,
  Col,
  Container,
  Alert,
} from 'reactstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import UserContext from './UserContext';

function LoginUserForm({ login }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  /**redirect to homepage if already logged in */
  if (currentUser) return <Navigate to={'/'} />;

  const INITIAL_STATE = {
    username: '',
    password: '',
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

  /** On submit, authenticate user on backend and display any errors.
   *  if successful
   *  - redirect to homepage
   */
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await login(formData);
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
              placeholder='username'
              value={formData.username}
              onChange={handleChange}
              className='mb-4'
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
              placeholder='password'
              value={formData.password}
              onChange={handleChange}
              className='mb-4'
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

export default LoginUserForm;
