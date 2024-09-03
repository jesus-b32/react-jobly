import React, { useEffect, useState } from 'react';
import JobCard from '../jobs/JobCard';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import { Container, Row, Col } from 'reactstrap';

function CompanyDetail() {
  const [company, setCompany] = useState({});
  const { handle } = useParams();

  useEffect(() => {
    async function getCompany(companyHandle) {
      const company = await JoblyApi.getCompany(companyHandle);
      setCompany(company);
    }
    getCompany(handle);
  }, [handle]);
  return (
    <Container fluid>
      <Container fluid className='d-flex align-items-center flex-column mb-4'>
        <h1>{company.name}</h1>
        <p>{company.description}</p>
      </Container>

      {company.jobs
        ? company.jobs.map((job) => (
            <Row
              key={job.id}
              className='d-flex align-items-center justify-content-center'
            >
              <Col className='col-8'>
                <JobCard job={job} />
              </Col>
            </Row>
          ))
        : null}
    </Container>
  );
}

export default CompanyDetail;
