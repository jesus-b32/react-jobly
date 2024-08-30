import React from 'react';
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
            <ListGroupItem>{`Salary: ${job.salary}`}</ListGroupItem>
            <ListGroupItem>{`Equity: ${job.equity}`}</ListGroupItem>
          </ListGroup>
          <Button className='mt-4'>Apply</Button>
        </CardBody>
      </Card>
    </>
  );
}

export default JobCard;
