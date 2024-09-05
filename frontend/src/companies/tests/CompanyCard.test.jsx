import CompanyCard from '../CompanyCard';
import { MemoryRouter } from 'react-router-dom';
import { companyData } from '../../tests/testCommon';
import { it, expect } from 'vitest';
import { render } from '@testing-library/react';

it('should render without crashing', () => {
  const company = companyData[0];
  render(
    <MemoryRouter>
      <CompanyCard company={company} />
    </MemoryRouter>
  );
});

it('should match snapshot', () => {
  const company = companyData[0];
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard company={company} />
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
