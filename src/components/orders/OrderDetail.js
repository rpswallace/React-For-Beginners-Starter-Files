import React from 'react';
import {getBalanceNotification} from '../../helpers';
import $ from 'jquery';

class OrderDetails extends React.Component{
  constructor() {
    super();
    this.renderProductList = this.renderProductList.bind(this);
  }
  renderProductList(key){
    const localStorageRef = localStorage.getItem(`order-${this.props.params.orderId}`);
    const details = JSON.parse(localStorageRef);
    const product = details.products[key];
    if(product){
      return (
        <tr key={key} className="order-product">
          <th scope="row">{product.units}</th>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.total}</td>
          <td>{product.desc}</td>
          <td>{product.tapeColor}</td>
          <td>{product.paperColor}</td>
        </tr>
      )
    }
  }
  render(){
    const localStorageRef = localStorage.getItem(`order-${this.props.params.orderId}`);
    const details = JSON.parse(localStorageRef);
    const productIds = Object.keys(details.products);
    const percentagePaid = (details.balance / details.total) * 100;
    const tagClass = getBalanceNotification(percentagePaid);
    return(
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="display-3">{details.clientName}</h1>
              <p className="lead"><b>Phone:</b> {details.clientPhone}</p>
              <p className="lead">{details.description}</p>
            </div>
            <div className="col-sm-6">
              <h2>Total: <span className="tag tag-info">{details.total}</span></h2>
              <h3>Balance: <span className={'tag ' + tagClass}>{details.balance}</span></h3>
            </div>
          </div>
          <hr className="my-2"/>
          <div className="row">
            <div className="col-sm-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Units</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Description</th>
                    <th>Tape Color</th>
                    <th>Paper Color</th>
                  </tr>
                </thead>
                <tbody>
                  {productIds.map(this.renderProductList)}
                </tbody>
              </table>
              <hr className="my-2"/>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th scope="row">Shipping Price</th>
                    <td>+{details.shippingPrice}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Total</th>
                    <td><b>{details.total}</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Payment #1 ({details.payment1Type})</th>
                    <td>-{details.payment1}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Payment #2 ({details.payment2Type})</th>
                    <td>-{details.payment2}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Balance</th>
                    <td><b>{details.balance}</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-sm-6">
              <div className="card card-block">
                <h3 className="card-title">Shipping Details</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><b>Delivery Date:</b> {details.deliveryDate}</li>
                  <li className="list-group-item"><b>Delivery Hour:</b> {details.deliveryHour}</li>
                  <li className="list-group-item"><b>Shipping Address:</b> {details.shippingAddress}</li>
                  <li className="list-group-item"><b>Shipping Price:</b> {details.shippingPrice}</li>
                  <li className="list-group-item"><b>Shipping in Charge:</b> {details.shippingInCharge}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

OrderDetails.propTypes = {
    // order: React.PropTypes.object.isRequired
    // removeFromOrder: React.PropTypes.func.isRequired
}

export default OrderDetails;