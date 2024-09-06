import NewUserForm from '../NewUserForm';
import { MemoryRouter } from 'react-router-dom';
import { it, expect, vi, afterEach } from 'vitest';
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitFor,
} from '@testing-library/react';
import UserContext from '../UserContext';

/**mock a successful login */
const signup = vi.fn().mockResolvedValue({ success: true });

// vi.mock('react-router-dom', () => ({
//   useNavigate: ({ to }) => `Redirected to ${to}`,
// }));

const TestNewUserForm = () => {
  const currentUser = null; //not signed in user
  return (
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser }}>
        <NewUserForm signup={signup} />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

it('should render without crashing', () => {
  render(<TestNewUserForm />);
});

it('should match snapshot', () => {
  const { asFragment } = render(<TestNewUserForm />);

  expect(asFragment()).toMatchSnapshot();
});

it('should update username field on change', () => {
  render(<TestNewUserForm />);

  const usernameInput = screen.getByLabelText('Username:');

  // Simulate a user typing into the input field
  fireEvent.change(usernameInput, {
    target: { value: 'johnDoe' },
  });

  // Assert the input value has changed
  expect(usernameInput.value).toBe('johnDoe');
});

it('should signup user on successful submit', async () => {
  render(<TestNewUserForm />);

  const usernameInput = screen.getByLabelText('Username:');
  const passwordInput = screen.getByLabelText('Password:');
  const firstNameInput = screen.getByLabelText('First Name:');
  const lastNameInput = screen.getByLabelText('Last Name:');
  const emailInput = screen.getByLabelText('Email:');
  const submitBtn = screen.getByText('Submit');

  // Simulate a user typing into the input field
  fireEvent.change(usernameInput, {
    target: { value: 'johnDoe' },
  });
  fireEvent.change(passwordInput, {
    target: { value: 'password' },
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

  expect(signup).toHaveBeenCalled(1);
  expect(signup).toHaveBeenCalledWith({
    username: 'johnDoe',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
  });

  //   await waitFor(() =>
  //     expect(screen.getByText('Redirected to /')).toBeInTheDocument()
  //   );
});

afterEach(cleanup);
