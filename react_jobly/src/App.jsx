import { useState, useEffect } from 'react';
import './App.css';
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
  // store the item type being added; updated in NewItemForm component
  // const [itemType, setItemType] = useState('');
  //store the new item data; updated in NewItemForm component
  // const [newItem, setNewItem] = useState(null);

  //store the list of companies; updated on first render and when new item added
  const [companies, setCompanies] = useState([]);
  //store the list of drinks available; updated on first render and when new item added
  // const [company, setCompany] = useState({});
  // const [companyHandle, setCompanyHandle] = useState('');

  useEffect(() => {
    async function getCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getCompanies();
    // console.log('companies: ', companies);
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
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/companies'
          element={<CompanyList companies={companies} />}
        />
        <Route path='/companies/:handle' element={<CompanyDetail />} />
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
