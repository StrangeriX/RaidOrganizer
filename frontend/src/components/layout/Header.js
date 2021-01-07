import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { useIsAuthenticated } from '../../api/AuthenticationProvider';
import Sidebar from '../Sidebar/Sidebar';

function GuestLink() {
  return (
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );
}

function Header() {
  const username = localStorage.getItem('username');
  const { isAuthenticated } = useIsAuthenticated();
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="navbar-brand col-5">
          <h3>Raid Organizer</h3>

        </div>

        <div className="" id="navbarToggler">
          {!isAuthenticated ? (
            <GuestLink />
          ) : (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item ">
                <span>Witaj {username}</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default memo(Header);
