import EditUserForm from '../EditUserForm';
import { MemoryRouter } from 'react-router-dom';
import { it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import UserContext from '../UserContext';
import JoblyApi from '../../api';
import { testuser, editTestuser } from '../../tests/testCommon';

vi.mock('../../api');
JoblyApi.updateUser = vi.fn().mockResolvedValue(editTestuser);
const setCurrentUser = vi.fn();

const TestEditUserForm = () => {
  const currentUser = testuser;
  return (
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <EditUserForm />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

it('should render without crashing', () => {
  render(<TestEditUserForm />);
});

it('should match snapshot', () => {
  const { asFragment } = render(<TestEditUserForm />);

  expect(asFragment()).toMatchSnapshot();
});

it('should display testUser firstName. update firstName field on change', () => {
  render(<TestEditUserForm />);

  const firstName = screen.getByLabelText('First Name:');
  expect(firstName.value).toBe('first');

  // Simulate a user typing into the input field
  fireEvent.change(firstName, {
    target: { value: 'Joe' },
  });

  // Assert the input value has changed
  expect(firstName.value).toBe('Joe');
});

it('should update user on successful submit', async () => {
  render(<TestEditUserForm />);

  //   const usernameInput = screen.getByLabelText('Username:');
  const passwordInput = screen.getByLabelText('Password:');
  const firstNameInput = screen.getByLabelText('First Name:');
  const lastNameInput = screen.getByLabelText('Last Name:');
  const emailInput = screen.getByLabelText('Email:');
  const submitBtn = screen.getByText('Submit');

  fireEvent.change(passwordInput, {
    target: { value: 'newPassword' },
  });
  fireEvent.change(firstNameInput, {
    target: { value: 'John' },
  });
  fireEvent.change(lastNameInput, {
    target: { value: 'Doe' },
  });
  fireEvent.change(emailInput, {
    target: { value: 'johndoe@gmail.com' },
  });
  fireEvent.click(submitBtn);

  expect(JoblyApi.updateUser).toHaveBeenCalled(1);
  expect(JoblyApi.updateUser).toHaveBeenCalledWith('testuser', {
    password: 'newPassword',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
  });
});

afterEach(cleanup);
