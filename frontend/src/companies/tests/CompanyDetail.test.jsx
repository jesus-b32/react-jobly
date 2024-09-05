import CompanyDetail from '../CompanyDetail';
import { MemoryRouter } from 'react-router-dom';
import JoblyApi from '../../api';
import { companyDetail } from '../../tests/testCommon';
import { it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import UserContext from '../../auth/UserContext';

vi.mock('../../api');
JoblyApi.getCompany = vi.fn().mockResolvedValue(companyDetail);
const hasAppliedToJob = vi.fn();
const applyToJob = vi.fn();

const TestCompanyDetail = () => {
  return (
    <MemoryRouter>
      <UserContext.Provider value={{ hasAppliedToJob, applyToJob }}>
        <CompanyDetail />
      </UserContext.Provider>
    </MemoryRouter>
  );
};

it('should render without crashing', () => {
  render(<TestCompanyDetail />);
});

it('should display a list of jobs', async () => {
  const { getAllByRole } = render(<TestCompanyDetail />);

  expect(JoblyApi.getCompany).toHaveBeenCalled();

  await waitFor(() => {
    /**Gave react strap row component a role called 'row' */
    const jobList = getAllByRole('row');
    expect(jobList).toHaveLength(2);
    expect(jobList[0]).toHaveTextContent(companyDetail.jobs[0].title);
    expect(jobList[1]).toHaveTextContent(companyDetail.jobs[1].title);
  });
});
