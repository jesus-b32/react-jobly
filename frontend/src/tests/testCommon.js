const testToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ' +
  'SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.' +
  'FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc';

const testuser = {
  username: 'testuser',
  password: 'password',
  firstName: 'first',
  lastName: 'last',
  email: 'test@gmail.com',
  applications: [],
};

const editTestuser = {
  username: 'updatedUser',
  firstName: 'first',
  lastName: 'last',
  email: 'new@gmail.com',
};

const testuser2 = {
  username: 'testuser2',
  password: 'password2',
  firstName: 'first',
  lastName: 'last',
  email: 'test@gmail.com',
  applications: [],
};

const companyData = [
  {
    handle: 'test1',
    name: 'test company 1',
    description: 'this is a test',
    numEmployees: 3,
    logoUrl: 'test logo',
  },
  {
    handle: 'test2',
    name: 'test company 2',
    description: 'this is a test',
    numEmployees: 3,
    logoUrl: 'test logo',
  },
];

const jobData = [
  {
    id: 1,
    title: 'test job 1',
    salary: 100000,
    equity: 0.3,
    companyName: 'test company 1',
    companyHandle: 'test1',
  },
  {
    id: 2,
    title: 'test job 2',
    salary: 75000,
    equity: 0.5,
    companyName: 'test company 2',
    companyHandle: 'test2',
  },
];

const companyDetail = {
  ...companyData[0],
  jobs: jobData,
};

export {
  companyData,
  jobData,
  testToken,
  testuser,
  testuser2,
  companyDetail,
  editTestuser,
};
