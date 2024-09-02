import { useState, useEffect } from 'react';
// import './App.css';
import JoblyApi from './api';
import NavBar from './navbar/NavBar';
import ReactRoutes from './routes/ReactRoutes';
import { jwtDecode } from 'jwt-decode';
import UserContext from './auth/UserContext';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  //store user details of current user logged in; updated when user submits login form or signup form
  const [currentUser, setCurrentUser] = useState(null);
  //store user details of current user logged in; updated when user submits login form or signup form
  const [token, setToken] = useLocalStorage('currUserToken');

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          const currentUser = await JoblyApi.getUser(username);
          setCurrentUser(currentUser);
          // setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error('App loadUserInfo: problem loading', err);
          setCurrentUser(null);
        }
      }
      setIsLoading(false);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setIsLoading(true);
    getCurrentUser();
  }, [token]);

  /** Handles signup.
   * Automatically logs user in (set token) upon signup.
   */
  async function signup(signupData) {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  /** Handles login.*/
  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  }

  /** Handles logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  //show a loading message while getting initial data
  if (isLoading) {
    return <h1>Loading &hellip;</h1>;
  }

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className='App'>
          <NavBar logout={logout} />
          <ReactRoutes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
