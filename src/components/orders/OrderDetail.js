import React from 'react';
// import {formatPrice} from '../helpers';
// import CSSTransitionGroup from 'react-addons-css-transition-group';

class OrderDetails extends React.Component{
  constructor() {
    super();
    this.renderProductList = this.renderProductList.bind(this);
  }
  renderProductList(key){
    const localStorageRef = localStorage.getItem(`order-${this.props.params.orderId}`);
    const details = JSON.parse(localStorageRef);
    const product = details.products[key];
    console.log(product);
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
  render(){
    const localStorageRef = localStorage.getItem(`order-${this.props.params.orderId}`);
    const details = JSON.parse(localStorageRef);
    const productIds = Object.keys(details.products);
    return(
      <div>
        <div className="col-xs-12 col-sm-6">
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Name:</b> {details.clientName}</li>
            <li className="list-group-item"><b>Phone:</b> {details.clientPhone}</li>
          </ul>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Delivery Date:</b> {details.deliveryDate}</li>
            <li className="list-group-item"><b>Delivery Hour:</b> {details.deliveryHour}</li>
            <li className="list-group-item"><b>Shipping Address:</b> {details.shippingAddress}</li>
            <li className="list-group-item"><b>Shipping Price:</b> {details.shippingPrice}</li>
            <li className="list-group-item"><b>Shipping in Charge:</b> {details.shippingInCharge}</li>
            <li className="list-group-item success"><b>Status</b> {details.status}</li>
          </ul>
        </div>
        <div className="col-xs-12 col-sm-6">
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
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>total:</b> {details.total}</li>
            <li className="list-group-item"><b>payment1:</b> {details.payment1} - {details.payment1Type}</li>
            <li className="list-group-item"><b>payment2:</b> {details.payment2} - {details.payment2Type}</li>
            <li className="list-group-item"><b>balance:</b> {details.balance}</li>
            <li className="list-group-item"><b>description:</b> {details.description}</li>
          </ul>
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