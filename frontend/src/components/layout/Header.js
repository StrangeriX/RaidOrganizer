import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Authenticated from '../../api/Authenticated';
import { useIsAuthenticated } from '../../api/AuthenticationProvider';

function UserLink() {
  return (
    <div>
      <span>AAaaa</span>
    </div>
  );
}

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
  const { isAuthenticated } = useIsAuthenticated();
  console.log(isAuthenticated);
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-brand">
          <Link to="/" className="nav-link">
            Raid Organizer
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="navbarToggler">
          {!isAuthenticated && <GuestLink />}
        </div>
      </div>
    </nav>
  );
}

export default memo(Header);
