import React from 'react';
import { Routes, Route } from 'react-router-dom';
//components
import HomePage from '../homepage/Homepage';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobList from '../jobs/JobList';
import NewUserForm from '../auth/NewUserForm';
import EditUserForm from '../auth/EditUserForm';
import LoginUserForm from '../auth/LoginUserForm';
import NotFound from '../common/NotFoundPage';
import ProtectedRoute from './ProtectedRoutes';

function ReactRoutes({ login, signup }) {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginUserForm login={login} />} />
        <Route path='/signup' element={<NewUserForm signup={signup} />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/companies' element={<CompanyList />} />
          <Route path='/companies/:handle' element={<CompanyDetail />} />
          <Route path='/jobs' element={<JobList />} />
          <Route path='/profile' element={<EditUserForm />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default ReactRoutes;
