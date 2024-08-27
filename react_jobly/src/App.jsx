import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
//components
import HomePage from './Homepage';
import CompanyList from './CompanyList';
import Company from './Company';
import JobList from './JobList';
import Job from './Job';
import NewUserForm from './NewUserForm';
import EditUserForm from './EditUserForm';
import LoginUserForm from './LoginUserForm';
import NavBar from './NavBar';
import NotFound from './NotFoundPage';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/companies' element={<CompanyList />} />
        <Route path='/companies/:handle' element={<Company />} />
        <Route path='/jobs' element={<JobList />} />
        <Route path='/login' element={<LoginUserForm />} />
        <Route path='/signup' element={<NewUserForm />} />
        <Route path='/profile' element={<EditUserForm />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
