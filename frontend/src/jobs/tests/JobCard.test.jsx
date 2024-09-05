import JobCard from '../JobCard';
import { MemoryRouter } from 'react-router-dom';
import { jobData } from '../../tests/testCommon';
import { it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import UserContext from '../../auth/UserContext';

// const setCurrentUser = vi.fn();
const hasAppliedToJob = vi.fn();
const applyToJob = vi.fn();

const TestJobCard = () => {
  const job = jobData[0];
  return (
    <MemoryRouter>
      <UserContext.Provider value={{ hasAppliedToJob, applyToJob }}>
        <JobCard job={job} />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

it('should render without crashing', () => {
  render(<TestJobCard />);
});

it('should match snapshot', () => {
  const { asFragment } = render(<TestJobCard />);
  expect(asFragment()).toMatchSnapshot();
});
