import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

function JobCard({ job }) {
  return (
    <>
      <Card>
        <CardBody className='text-center'>
          <CardTitle tag={'h4'}>{job.title}</CardTitle>
          {job.companyName ? (
            <CardSubtitle tag={'h6'}>job.companyName</CardSubtitle>
          ) : null}
          <ListGroup>
            <ListGroupItem>{job.salary}</ListGroupItem>
            <ListGroupItem>{job.equity}</ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </>
  );
}

export default JobCard;
