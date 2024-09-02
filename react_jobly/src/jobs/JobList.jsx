import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import SearchBox from '../common/SearchBox';
import JobCard from './JobCard';
import { Container, Row, Col } from 'reactstrap';

function JobList() {
  //store the list of companies; updated on first render and when new item added
  const [jobs, setJobs] = useState([]);
  //get intial list of jobs on first render
  useEffect(() => {
    async function getJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);

  const [filterTerm, setFilterTerm] = useState('');
  const filteredJobs =
    filterTerm === ''
      ? jobs
      : jobs.filter((job) =>
          job.title.toLowerCase().includes(filterTerm.toLowerCase())
        );

  if (!jobs) {
    return <h1>Loading &hellip;</h1>;
  }

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
