import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../auth/UserContext';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

function JobCard({ job }) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [jobApplied, setJobApplied] = useState();

  /** Check if jobs has already been applied to and update state */
  useEffect(() => {
    setJobApplied(hasAppliedToJob(job.id));
  }, [job.id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleJobApply(event) {
    if (hasAppliedToJob(job.id)) return;
    applyToJob(job.id);
    setJobApplied(true);
  }

  return (
    <>
      <Card>
        <CardBody className='text-center'>
          <CardTitle tag={'h4'}>{job.title}</CardTitle>
          {job.companyName ? (
            <CardSubtitle
              tag={'h6'}
            >{`Company: ${job.companyName}`}</CardSubtitle>
          ) : null}
          <ListGroup className='mt-4' flush>
            <ListGroupItem>{`Salary: ${job.salary || 0}`}</ListGroupItem>
            <ListGroupItem>{`Equity: ${job.equity || 0}`}</ListGroupItem>
          </ListGroup>
          {jobApplied ? (
            <Button className='mt-4' color='danger' disabled>
              Applied
            </Button>
          ) : (
            <Button className='mt-4' color='danger' onClick={handleJobApply}>
              Apply
            </Button>
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default JobCard;
