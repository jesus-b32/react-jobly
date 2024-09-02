import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import SearchBox from '../common/SearchBox';
import JobCard from './JobCard';
import { Container, Row, Col } from 'reactstrap';

function JobList() {
  //store the list of companies; updated on first render and when new item added
  const [jobs, setJobs] = useState(null);

  /** get a list of jobs with the option to filter by name*/
  async function getJobs(title) {
    const jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }
  //get intial list of jobs on first render
  useEffect(() => {
    getJobs();
  }, []);

  if (!jobs) {
    return <h1>Loading &hellip;</h1>;
  }

  return (
    <>
      <Container fluid>
        <SearchBox filter={getJobs} />
      </Container>
      <Container fluid>
        {jobs.map((job) => (
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
