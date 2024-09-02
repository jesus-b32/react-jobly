import React from 'react';
import { useState, useEffect } from 'react';
import JoblyApi from '../api';
import { Link } from 'react-router-dom';
import CompanyCard from './CompanyCard';
import SearchBox from '../common/SearchBox';
import { Container, Row, Col } from 'reactstrap';

function CompanyList() {
  //store the list of companies; updated on first render and when new item added
  const [companies, setCompanies] = useState(null);

  //get intial list of companies on first render
  useEffect(() => {
    async function getCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    getCompanies();
  }, []);

  const [filterTerm, setFilterTerm] = useState('');
  // create new array filtered using filterTerm
  const filteredCompanies =
    filterTerm === ''
      ? companies
      : companies.filter((company) =>
          company.name.toLowerCase().includes(filterTerm.toLowerCase())
        );

  if (!companies) {
    return <h1>Loading &hellip;</h1>;
  }

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
