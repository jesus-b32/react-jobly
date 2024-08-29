import React, { useState } from 'react';
import SearchBox from './SearchBox';
import JobCard from './JobCard';

function JobList({ jobs }) {
  const [filterTerm, setFilterTerm] = useState('');
  // console.log('filter Term: ', filterTerm);
  const filteredJobs =
    filterTerm === ''
      ? jobs
      : jobs.filter((job) =>
          job.title.toLowerCase().includes(filterTerm.toLowerCase())
        );
  // console.log('filtered List: ', filteredCompanies);
  return (
    <>
      <SearchBox updateFilter={setFilterTerm} />

      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
}

export default JobList;
