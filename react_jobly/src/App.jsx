import { useState, useEffect } from 'react';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import JoblyApi from '../api';
//components
import HomePage from './Homepage';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import NewUserForm from './NewUserForm';
import EditUserForm from './EditUserForm';
import LoginUserForm from './LoginUserForm';
import NavBar from './NavBar';
import NotFound from './NotFoundPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  //store the list of companies; updated on first render and when new item added
  const [companies, setCompanies] = useState([]);
  //store the list of companies; updated on first render and when new item added
  const [jobs, setJobs] = useState([]);
  //store the state of whether a user is logged in; updated on first render and when user submits login form
  const [isLoggedIn, setisLoggedIn] = useState(false);
  //store the username of current user logged in; updated when user submits login form or signup form
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    async function getCompanies() {
      const companies = await JoblyApi.getCompanies();
      const jobs = await JoblyApi.getJobs();
      setCompanies(companies);
      setJobs(jobs);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  // useEffect(() => {
  //   async function getCompany(companyHandle) {
  //     const company = await JoblyApi.getCompany(companyHandle);
  //     console.log('company', company);
  //     setCompany(company);
  //     // setIsLoading(false);
  //   }
  //   getCompany(companyHandle);
  //   // console.log('companies: ', companies);
  // }, [companyHandle]);

  if (isLoading) {
    return <h1>Loading &hellip;</h1>;
  }

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route
          path='/'
          element={<HomePage isLoggedIn={isLoggedIn} username={currentUser} />}
        />
        <Route
          path='/companies'
          element={<CompanyList companies={companies} />}
        />
        <Route path='/companies/:handle' element={<CompanyDetail />} />
        <Route path='/jobs' element={<JobList jobs={jobs} />} />
        <Route
          path='/login'
          element={<LoginUserForm setisLoggedIn={setisLoggedIn} />}
        />
        <Route path='/signup' element={<NewUserForm />} />
        <Route path='/profile' element={<EditUserForm />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
