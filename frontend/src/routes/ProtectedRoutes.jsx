import React, { useContext } from 'react';
import UserContext from '../auth/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

/** Protect unauthorized users from accessing routes below:
 *  - /companies or /companies/:handle
 *  - /jobs
 *  - /profile
 *
 *  Rendered in Routes to check if there is a valid
 *  current user. If no user is present, redirect
 *  to login form.
 */

function ProtectedRoute() {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) return <Navigate to={'/login'} />;

  return <Outlet />;
}

export default ProtectedRoute;
