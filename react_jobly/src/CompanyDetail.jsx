import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';

function CompanyDetail() {
  const [company, setCompany] = useState({});
  const { handle } = useParams();
  //   updateHandle(handle);
  useEffect(() => {
    async function getCompany(companyHandle) {
      const company = await JoblyApi.getCompany(companyHandle);
      //   console.log('company', company);
      setCompany(company);
      // setIsLoading(false);
    }
    getCompany(handle);
    // console.log('companies: ', companies);
  }, [handle]);
  //   console.log('company handle: ', handle);
  //   const company = companies.filter((company) => company.handle === handle);
  //   const company = companies.find((company) => company.handle === handle);
  //   const company = JoblyApi.getCompany(handle);
  //   console.log('company: ', company);
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
