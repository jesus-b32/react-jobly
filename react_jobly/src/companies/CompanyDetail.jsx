import React, { useEffect, useState } from 'react';
import JobCard from '../jobs/JobCard';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';

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
    <>
      <h1>{company.name}</h1>
      <h2>{company.description}</h2>
      {company.jobs
        ? company.jobs.map((job) => <JobCard key={job.id} job={job} />)
        : null}
    </>
  );
}

export default CompanyDetail;
