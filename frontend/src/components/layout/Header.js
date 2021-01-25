import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from '../../api/AuthenticationProvider';
import Login from '../../views/Login/Login';
import Sidebar from '../Sidebar/Sidebar';
import './Header.css';
import Title from '../../../static/images/Title.png';

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
    <nav className="navbar navbar-expand-sm">
      <div className="container">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="navbar-brand col-5">
          <Link to="/home">
            <img src={Title} />
          </Link>
        </div>

        <div className="" id="navbarToggler">
          {!isAuthenticated ? (
            <GuestLink />
          ) : (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <span className="welcome">Witaj {username}</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default memo(Header);
