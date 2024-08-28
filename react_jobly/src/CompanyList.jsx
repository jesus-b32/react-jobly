import React from 'react';
import { useState } from 'react';
import CompanyDetail from './CompanyDetail';
import SearchBox from './SearchBox';

function CompanyList({ companies }) {
  const [filter, setFilter] = useState('');
  return (
    <>
      {companies.map((company) => (
        <CompanyDetail key={company.handle} company={company} />
      ))}
    </>
  );
}

export default CompanyList;
