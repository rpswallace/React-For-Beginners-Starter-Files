import React from 'react';
import base from '../../base';

class EditOrderForm extends React.Component{
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  UpdateOrder(e){
    e.preventDefault();
    const order = {
        clientName: this.clientName.value,
        clientPhone: this.clientPhone.value,
        deliveryDate: this.deliveryDate.value,
        deliveryHour: this.deliveryHour.value,
        shippingAddress: this.shippingAddress.value,
        shippingPrice: this.shippingPrice.value,
        shippingInCharge: this.shippingInCharge.value,
        status: this.status.value,
        total: this.total.value,
        payment1: this.payment1.value,
        payment1Type: this.payment1Type.value,
        payment2: this.payment2.value,
        payment2Type: this.payment2Type.value,
        balance: this.balance.value,
        description: this.description.value
    }

    const ordersRef = base.database().ref('orders');
    const timestamp = Date.now();
    ordersRef.child(`order-${timestamp}`).set({order});

    // Clear form inputs after submission
    this.orderForm.reset();
  }
  handleChange(e){
    const order = this.props.order;
    // console.log(e.target.name, e.target.defaultValuealue);
    // Here is why we need input name attr, because we want to let react know which is the field/attribute we're changing.
    // take a copy of that fish and update it with the new data
    const updatedOrder = {
        ...order,
        [e.target.name]: e.target.value
    };
    // console.log(updatedOrder);
    this.props.updateOrder(updatedOrder);
  }
   

  updateAmounts(e){
    const balance = parseInt(document.getElementById('total').value, 10) - ((parseInt(document.getElementById('payment1').value, 10) || 0) + (parseInt(document.getElementById('payment2').value, 10) || 0));

    if(!isNaN(balance)){
      document.getElementById('balance').value = balance;
      this.handleChange(e);
    }
  }
  render(){
    const order = this.props.order;
    return (
      <form className="order-edit">
        <div className="form-group row">
          <label htmlFor="name" className="col-xs-12 col-form-label">Name</label>
          <div className="col-xs-12">
            <input className="form-control" value={order.clientName} type="text" placeholder="Name" id="clientName" name="clientName" onChange={(e) => this.handleChange(e)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="phone" className="col-xs-12 col-form-label">Phone</label>
          <div className="col-xs-12">
            <input className="form-control" value={order.clientPhone} type="tel" placeholder="88387675" id="clientPhone" name="clientPhone" onChange={(e) => this.handleChange(e)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="date" className="col-xs-12 col-form-label">Delivery Date</label>
          <div className="col-xs-12">
            <input className="form-control" value={order.deliveryDate} type="date" id="deliveryDate" name="deliveryDate" onChange={(e) => this.handleChange(e)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="hour" className="col-xs-12 col-form-label">Delivery Hour</label>
          <div className="col-xs-12">
            <input className="form-control" value={order.deliveryHour} type="time" placeholder="Hour" id="delivery-hour" name="deliveryHour" onChange={(e) => this.handleChange(e)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="shipping-address" className="col-xs-12 col-form-label">Shipping Address</label>
          <div className="col-xs-12">
            <input className="form-control" value={order.shippingAddress} type="text" placeholder="Address" id="shipping-address" name="shippingAddress"onChange={(e) => this.handleChange(e)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="shipping-price" className="col-xs-12 col-form-label">Shipping Price</label>
          <div className="col-xs-12">
            <input className="form-control" value={order.shippingPrice} type="number" placeholder="Price" id="shipping-price" name="shippingPrice" onChange={(e) => this.handleChange(e)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="shipping-in-charge" className="col-xs-12 col-form-label">Shipping in charge</label>
          <div className="col-xs-12">
            <input className="form-control" value={order.shippingInCharge} type="text" placeholder="Name" id="shipping-in-charge" name="shippingInCharge" onChange={(e) => this.handleChange(e)} />
          </div>
        </div>
        <div className="form-group row">
            <label htmlFor="status" className="col-xs-12 col-form-label">Status</label>
            <div className="col-xs-12">
                <select className="form-control" value={order.status} id="status" name="status" onChange={(e) => this.handleChange(e)}>
                    <option value="1">Confirm</option>
                    <option value="0">Not confirm</option>
                </select>
            </div>
        </div>
        <div className="form-group row">
          <label htmlFor="total" className="col-xs-12 col-form-label">Total</label>
          <div className="col-xs-12">
            <input className="form-control" value={order.total} type="number" placeholder="Total" id="total" name="total" onChange={(e) => this.updateAmounts(e)} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6">
            <label htmlFor="payment1" className="col-xs-12 col-form-label">Payment #1</label>
            <div className="col-xs-12">
              <input className="form-control" value={order.payment1} type="number" placeholder="Amount" id="payment1" name="payment1" onChange={(e) => this.updateAmounts(e)}/>
            </div>
          </div>
          <div className="col-xs-6">
            <label htmlFor="payment1Type" className="col-xs-12 col-form-label">Payment Type</label>
            <div className="col-xs-12">
                <select className="form-control" value={order.payment1Type} id="payment1Type" name="payment1Type" onChange={(e) => this.handleChange(e)}>
                    <option value="Chash">Cash</option>
                    <option value="Transfer">Transfer</option>
                </select>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6">
            <label htmlFor="payment2" className="col-xs-12 col-form-label">Payment #2</label>
            <div className="col-xs-12">
              <input className="form-control" value={order.payment2} type="number" placeholder="Amount" id="payment2" name="payment2" onChange={(e) => this.updateAmounts(e)}/>
            </div>
          </div>
          <div className="col-xs-6">
            <label htmlFor="payment2Type" className="col-xs-12 col-form-label">Payment Type</label>
            <div className="col-xs-12">
                <select className="form-control" value={order.payment2Type} id="payment2Type" name="payment2Type" onChange={(e) => this.handleChange(e)} >
                    <option value="Chash">Cash</option>
                    <option value="Transfer">Transfer</option>
                </select>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="balance" className="col-xs-12 col-form-label">Balance</label>
          <div className="col-xs-12">
            <input className="form-control" value={order.balance} type="number" placeholder="Amount" id="balance" name="balance" onChange={(e) => this.updateAmounts(e)}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="description" className="col-xs-12 col-form-label">Description</label>
          <div className="col-xs-12">
            <textarea className="form-control" value={order.description} type="text" placeholder="Description" id="description" name="description"></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    )
  }
}

EditOrderForm.propTypes = {
  // addOrder: React.PropTypes.func.isRequired
}

export default EditOrderForm;
// export default connectToStores(AddOrderForm);