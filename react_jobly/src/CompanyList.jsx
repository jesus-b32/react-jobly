import React from 'react';
import { useState } from 'react';
import CompanyDetail from './CompanyDetail';
import SearchBox from './SearchBox';

function CompanyList({ companies }) {
  const [filterTerm, setFilterTerm] = useState('');
  // console.log('filter Term: ', filterTerm);
  const filteredCompanies =
    filterTerm === ''
      ? companies
      : companies.filter((company) =>
          company.name.toLowerCase().includes(filterTerm.toLowerCase())
        );
  // console.log('filtered List: ', filteredCompanies);
  return (
    <>
      <SearchBox updateFilter={setFilterTerm} />
      {filteredCompanies.map((company) => (
        <CompanyDetail key={company.handle} company={company} />
      ))}
    </>
  );
}

export default CompanyList;
