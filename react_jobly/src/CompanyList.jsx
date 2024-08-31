import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import SearchBox from './SearchBox';
import { Container, Row, Col } from 'reactstrap';

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
      <Container fluid>
        <SearchBox updateFilter={setFilterTerm} />
      </Container>

      <Container fluid>
        {filteredCompanies.map((company) => (
          <Row
            key={company.handle}
            className='d-flex align-items-center justify-content-center'
          >
            <Col className='col-8'>
              <Link to={`/companies/${company.handle}`} key={company.handle}>
                <CompanyCard company={company} />
              </Link>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default CompanyList;
