import CompanyList from '../CompanyList';
import { MemoryRouter } from 'react-router-dom';
import JoblyApi from '../../api';
import { companyData } from '../../tests/testCommon';
import { it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';

vi.mock('../../api');
JoblyApi.getCompanies = vi.fn().mockResolvedValue(companyData);

it('should render without crashing', () => {
  render(
    <MemoryRouter>
      <CompanyList />
    </MemoryRouter>
  );
});

it('should display a list of companies', async () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <CompanyList />
    </MemoryRouter>
  );

  expect(JoblyApi.getCompanies).toHaveBeenCalled();

  await waitFor(() => {
    /**Gave react strap row component a role called 'row' */
    const companyList = getAllByRole('row');
    expect(companyList).toHaveLength(2);
    expect(companyList[0]).toHaveTextContent(companyData[0].name);
    expect(companyList[1]).toHaveTextContent(companyData[1].name);
  });
});
