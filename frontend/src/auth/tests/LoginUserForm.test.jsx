import LoginUserForm from '../LoginUserForm';
import { MemoryRouter } from 'react-router-dom';
import { it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import UserContext from '../../auth/UserContext';

/**mock a successful login */
const login = vi.fn().mockResolvedValue({ success: true });

const TestLoginUserForm = () => {
  const currentUser = null; //not signed in user
  return (
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser }}>
        <LoginUserForm login={login} />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

it('should render without crashing', () => {
  render(<TestLoginUserForm />);
});

it('should match snapshot', () => {
  const { asFragment } = render(<TestLoginUserForm />);

  expect(asFragment()).toMatchSnapshot();
});

it('should update username field on change', () => {
  render(<TestLoginUserForm />);

  const usernameInput = screen.getByLabelText('Username:');

  // Simulate a user typing into the input field
  fireEvent.change(usernameInput, {
    target: { value: 'johnDoe' },
  });

  // Assert the input value has changed
  expect(usernameInput.value).toBe('johnDoe');
});

it('should login user on successful submit', () => {
  render(<TestLoginUserForm />);

  const usernameInput = screen.getByLabelText('Username:');
  const passwordInput = screen.getByLabelText('Password:');
  const submitBtn = screen.getByText('Submit');

  // Simulate a user typing into the input field
  fireEvent.change(usernameInput, {
    target: { value: 'johnDoe' },
  });
  fireEvent.change(passwordInput, {
    target: { value: 'password' },
  });
  fireEvent.click(submitBtn);

  expect(login).toHaveBeenCalled(1);
  expect(login).toHaveBeenCalledWith({
    username: 'johnDoe',
    password: 'password',
  });
});

afterEach(cleanup);
