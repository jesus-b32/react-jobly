import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import UserContext from '../auth/UserContext';

it('renders the App component', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

it('it matches snapshot', () => {
  const app = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(app).toMatchSnapshot();
});

it('it displays Jobly title and slogan', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Jobly')).toBeInTheDocument();
  expect(
    screen.getByText('All the jobs in one, convenient place.')
  ).toBeInTheDocument();
});

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <UserContext.Provider {...providerProps}>
      <MemoryRouter>{ui}</MemoryRouter>
    </UserContext.Provider>,
    renderOptions
  );
};

/**
 * To test a component that provides a context value, render a matching
 * consumer as the child
 */
// it('NameConsumer shows value from provider', () => {
//   const currentUser = {
//     firstName: 'John',
//   };
//   customRender(<App />, { currentUser });
//   expect(screen.getByText('Welcome Back, John!')).toBeInTheDocument();
// });

/**
 * To test a component that provides a context value, render a matching
 * consumer as the child
 */
// it('NameProvider composes full name from first, last', () => {
//   const providerProps = {
//     first: 'Boba',
//     last: 'Fett',
//   }
//   customRender(
//     <UserContext.Consumer>
//       {(value) => <span>Received: {value}</span>}
//     </UserContext.Consumer>,
//     { providerProps }
//   );
//   expect(screen.getByText(/^Received:/).textContent).toBe('Received: Boba Fett')
// })
