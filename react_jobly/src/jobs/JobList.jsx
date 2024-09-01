import React, { useState } from 'react';
import SearchBox from '../common/SearchBox';
import JobCard from './JobCard';
import { Container, Row, Col } from 'reactstrap';

function JobList({ jobs }) {
  const [filterTerm, setFilterTerm] = useState('');
  const filteredJobs =
    filterTerm === ''
      ? jobs
      : jobs.filter((job) =>
          job.title.toLowerCase().includes(filterTerm.toLowerCase())
        );

  return (
    <>
      <Container fluid>
        <SearchBox updateFilter={setFilterTerm} />
      </Container>
      <Container fluid>
        {filteredJobs.map((job) => (
          <Row
            key={job.id}
            className='d-flex align-items-center justify-content-center'
          >
            <Col className='col-8'>
              <JobCard job={job} />
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default JobList;
