import React from 'react';
// import {formatPrice} from '../helpers';
// import CSSTransitionGroup from 'react-addons-css-transition-group';

class OrderDetails extends React.Component{
  render(){
    const details = this.props.order;
    return(
      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
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
        </ul>
        <ul className="list-group list-group-flush">
          <li className="list-group-item success"><b>Status</b> {details.deliveryDate}</li>
          <li className="list-group-item"><b>total:</b> {details.total}</li>
          <li className="list-group-item"><b>payment1:</b> {details.payment1} - {details.payment1Type}</li>
          <li className="list-group-item"><b>payment2:</b> {details.payment2} - {details.payment2Type}</li>
          <li className="list-group-item"><b>balance:</b> {details.balance}</li>
        </ul>
      </div>
    )
  }
}

OrderDetails.propTypes = {
    order: React.PropTypes.object.isRequired
    // removeFromOrder: React.PropTypes.func.isRequired
}

export default OrderDetails;