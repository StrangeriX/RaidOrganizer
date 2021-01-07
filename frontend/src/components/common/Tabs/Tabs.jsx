import React from 'react';

function Tabs({ values = [], onSelectTab }) {
  return values.map((value, index) => (
    <li className="nav-item" key={value}>
      <a className="nav-link active" data-toggle="tab" href="#home" onClick={onSelectTab(index)}>
        {value}
      </a>
    </li>
  ));
}

export default Tabs;
