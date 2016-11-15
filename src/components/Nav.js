import React from 'react';

// Stateless functional component 
const Nav = (props) => {
  return (
    <ul className="nav nav-tabs" role="tablist" id="myTab">
      <li className="nav-item">
        <a className="nav-link active" data-toggle="tab" href="#orders" role="tab">Orders</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#addOrders" role="tab">Add Orders</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#products" role="tab">Products</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-toggle="tab" href="#addProducts" role="tab">Add Products</a>
      </li>
    </ul>
    )
}

export default Nav;