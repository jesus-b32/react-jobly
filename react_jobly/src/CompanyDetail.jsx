import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function CompanyDetail({ company }) {
  return (
    <>
      <Card>
        <CardBody className='text-center'>
          <CardTitle tag={'h4'}>{company.name}</CardTitle>
          <CardText>{company.description}</CardText>
        </CardBody>
      </Card>
    </>
  );
}

export default CompanyDetail;
