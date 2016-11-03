import React from 'react';

// Stateless functional component 
const Nav = (props) => {
  return (
   <nav className="navbar navbar-light bg-faded">
      <ul className="nav navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="addOrder">Add Order</a>
        </li>
      </ul>
    </nav>
    )
}

export default Nav;