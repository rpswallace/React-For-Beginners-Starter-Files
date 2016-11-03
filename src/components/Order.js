import React from 'react';
// import {formatPrice} from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component{
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    // This is not a specific one from React, was made separate a bit the code.
    renderOrder(key){
        const order = this.props.orders[key];
        // const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>;

        const orderStatus = (order.status) ? 'card-success' : 'card-warning';
            

        if(!order || order.status === 'unavailable'){
            return <li key={key}>Sorry, {order ? order.name : 'order'} is not longer available! {removeButton}</li>
        }
        return(
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={key}>
            <div className={'card card-inverse ' + orderStatus}>
              <div className="card-block">
                <h4 className="card-title">{order.clientName}</h4>
                <p className="card-text"><b>Phone:</b> {order.clientPhone}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>Delivery Date:</b> {order.deliveryDate}</li>
                <li className="list-group-item"><b>Delivery Hour:</b> {order.deliveryHour}</li>
                <li className="list-group-item"><b>Address:</b> {order.shippingAddress}</li>
              </ul>
              <div className="card-block">
                <a href="#" className="card-link">Details</a>
                <a href="#" className="card-link">Edit</a>
              </div>
            </div>
            </div>
        )
    }
    render(){
        const orderIds = Object.keys(this.props.orders);
        // const total = orderIds.reduce((prevTotal, key) => {
        //     const fish = this.props.fishes[key];
        //     const count = this.props.order[key];
        //     const isAvailable = fish && fish.status === 'available';
        //     if(isAvailable){
        //         return prevTotal + (count * fish.price || 0);
        //     }
        //     else{
        //         return prevTotal;
        //     }
        // }, 0)
        // reduce needs a starting value, in this case from 0
        return (
              <CSSTransitionGroup 
                  className="orders invisible col-xs-12"
                  component="div"
                  transitionName="order"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                  >
                      {orderIds.map(this.renderOrder)}
              </CSSTransitionGroup>
        )
    }
}

Order.propTypes = {
    // fishes: React.PropTypes.object.isRequired,
    orders: React.PropTypes.object.isRequired
    // removeFromOrder: React.PropTypes.func.isRequired
}

export default Order;