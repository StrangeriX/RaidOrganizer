import React from 'react';

function Sidebar() {
  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Sidebar</h3>
        </div>
        <ul className="list-unstyled components nav-brand">
          <li className="active nav-brand">
            <a
              href="#homeSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Home
            </a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Home 1
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Home 2
                </a>
              </li>
              <li>
                <a href="#">Home 3</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}


export default Sidebar;
