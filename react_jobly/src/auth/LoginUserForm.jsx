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
  FormFeedback,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function LoginUserForm({ login }) {
  const navigate = useNavigate();

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

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await login(formData);
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
          <Label for='username' md='1'>
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
          <Label for='password' md='1'>
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
        {formErrors.length ? (
          <FormFeedback tooltip>{formErrors}</FormFeedback>
        ) : null}
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default LoginUserForm;
