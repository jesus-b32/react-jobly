import JobList from '../JobList';
import { MemoryRouter } from 'react-router-dom';
import JoblyApi from '../../api';
import { jobData } from '../../tests/testCommon';
import { it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import UserContext from '../../auth/UserContext';

vi.mock('../../api');
JoblyApi.getJobs = vi.fn().mockResolvedValue(jobData);
const hasAppliedToJob = vi.fn();
const applyToJob = vi.fn();

const TestJobList = () => {
  return (
    <MemoryRouter>
      <UserContext.Provider value={{ hasAppliedToJob, applyToJob }}>
        <JobList />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

it('should render without crashing', () => {
  render(<TestJobList />);
});

it('should display a list of jobs', async () => {
  const { getAllByRole } = render(<TestJobList />);

  expect(JoblyApi.getJobs).toHaveBeenCalled();

  await waitFor(() => {
    /**Gave react strap row component a role called 'row' */
    const jobList = getAllByRole('row');
    expect(jobList).toHaveLength(2);
    expect(jobList[0]).toHaveTextContent(jobData[0].title);
    expect(jobList[1]).toHaveTextContent(jobData[1].title);
  });
});
