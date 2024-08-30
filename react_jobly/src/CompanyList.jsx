import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import SearchBox from './SearchBox';

function CompanyList({ companies }) {
  const [filterTerm, setFilterTerm] = useState('');
  // create new array filtered using filterTerm
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
        <Link to={`/companies/${company.handle}`} key={company.handle}>
          <CompanyCard key={company.handle} company={company} />
        </Link>
      ))}
    </>
  );
}

export default CompanyList;
