import { render } from '@testing-library/react';
import NavBar from '../NavBar';
import { MemoryRouter } from 'react-router-dom';
import { it, expect } from 'vitest';
import UserContext from '../../auth/UserContext';
import { testuser } from '../../tests/testCommon';

const TestNavBar = () => {
  const currentUser = testuser;
  return (
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser }}>
        <NavBar />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

it('should render without crashing', () => {
  render(<TestNavBar />);
});

it('should match snapshot', () => {
  const { asFragment } = render(<TestNavBar />);
  expect(asFragment()).toMatchSnapshot();
});
