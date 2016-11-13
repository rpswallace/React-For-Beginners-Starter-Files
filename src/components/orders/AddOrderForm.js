import React from 'react';
import base from '../../base';
import $ from 'jquery';

class AddOrderForm extends React.Component{
  constructor() {
    super();
    this.renderProductsDropdown = this.renderProductsDropdown.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.updateOrderAmount = this.updateOrderAmount.bind(this);
    this.renderProductList = this.renderProductList.bind(this);
    this.totalOrder = 0;
    this.orderProductList = {};

    this.state = {
      orderProductList: {}
    }
  }
  createOrder(e){
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
  updateAmounts(e){
    const balance = parseInt(document.getElementById('total').value, 10) - ((parseInt(document.getElementById('payment1').value, 10) || 0) + (parseInt(document.getElementById('payment2').value, 10) || 0));

    if(!isNaN(balance)){
      document.getElementById('balance').value = balance;
    }
  }
  updateOrderAmount(e, price){
    this.totalOrder = 0;
    const that = this;
    $('.order-product input.unit').filter(function() { 
      if($(this).val() != ""){
        that.totalOrder += (parseInt($(this).val(), 10)) * (parseInt($(this).data('price'), 10));
      }
    });
    $('#total, #balance').val(that.totalOrder);

  }
  renderProductList(key){
    // console.log(product.name)
    const product = this.state.orderProductList[key].product;
    // console.log(product)
    if(product){
      return(
        <li key={key} className="order-product">
          {product.name}
          <input className="form-control unit" type="text" placeholder="Units" id="units" name="units" data-price={product.price} onChange={(e) => this.updateOrderAmount(e,product.price)}/>
          <input className="form-control" type="text" placeholder="tape color" id="tape" name="tape" />
          <input className="form-control" type="text" placeholder="paper color" id="paper" name="paper" />
        </li>
        )
    }
  }
  handleProductChange(e){
    if(e.target.value){
      // console.log(e.target.value);
      const productsRef = base.database().ref('products').child(e.target.value);
      productsRef.on('value', (snapshot) => {
        const data = snapshot.val() || {};

        this.orderProductList[e.target.value] = data;
        
        this.setState({orderProductList:this.orderProductList});

        // $('#order-product-list').append();
        // $('#total').val(this.totalOrder);
      });
    }
  }
  renderProductsDropdown(key){
    const product = this.props.products[key].product;

    if(parseInt(product.status, 10) === 1){
      return(
        <option key={key} value={key}>{product.name}</option>
      )
    }
  }
  render(){
    const productIds = Object.keys(this.props.products) || [];
    const orderProductListIds = Object.keys(this.state.orderProductList) || [];
    return (
      <form ref={(input) => this.orderForm = input} className="order-edit" onSubmit={(e) => this.createOrder(e)}>
        <div className="form-group row">
          <label htmlFor="name" className="col-xs-12 col-form-label">Name</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.clientName = input} type="text" placeholder="Name" id="name" name="name" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="phone" className="col-xs-12 col-form-label">Phone</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.clientPhone = input} type="tel" placeholder="88387675" id="phone" name="phone" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="date" className="col-xs-12 col-form-label">Delivery Date</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.deliveryDate = input} type="date" id="date" name="date" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="hour" className="col-xs-12 col-form-label">Delivery Hour</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.deliveryHour = input} type="time" placeholder="Hour" id="hour" name="hour" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="shipping-address" className="col-xs-12 col-form-label">Shipping Address</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.shippingAddress = input} type="text" placeholder="Address" id="shipping-address" name="shipping-address"/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="shipping-price" className="col-xs-12 col-form-label">Shipping Price</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.shippingPrice = input} type="number" placeholder="Price" id="shipping-price" name="shipping-price" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="shipping-in-charge" className="col-xs-12 col-form-label">Shipping in charge</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.shippingInCharge = input} type="text" placeholder="Name" id="shipping-in-charge" name="shipping-in-charge" />
          </div>
        </div>
        <div className="form-group row">
            <label htmlFor="status" className="col-xs-12 col-form-label">Status</label>
            <div className="col-xs-12">
                <select className="form-control" ref={(input) => this.status = input} id="status" name="status"  >
                    <option value="1">Confirm</option>
                    <option value="0">Not confirm</option>
                </select>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="product" className="col-xs-12 col-form-label">Product</label>
            <div className="col-xs-12">
                <select className="form-control" ref={(input) => this.product = input} id="product" name="product" onChange={(e) => this.handleProductChange(e)} >
                  <option value="">Select Product</option>
                  {productIds.map(this.renderProductsDropdown)}
                </select>
            </div>
        </div>
        <ul id="order-product-list">
          {orderProductListIds.map(this.renderProductList)}
        </ul>
        <div className="form-group row">
          <label htmlFor="total" className="col-xs-12 col-form-label">Total</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.total = input} type="number" placeholder="Total" id="total" name="total" readOnly />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6">
            <label htmlFor="payment1" className="col-xs-12 col-form-label">Payment #1</label>
            <div className="col-xs-12">
              <input className="form-control" ref={(input) => this.payment1 = input} type="number" placeholder="Amount" id="payment1" name="payment1" onChange={(e) => this.updateAmounts(e)}/>
            </div>
          </div>
          <div className="col-xs-6">
            <label htmlFor="payment1Type" className="col-xs-12 col-form-label">Payment Type</label>
            <div className="col-xs-12">
                <select className="form-control" ref={(input) => this.payment1Type = input} id="payment1Type" name="payment1Type"  >
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
              <input className="form-control" ref={(input) => this.payment2 = input} type="number" placeholder="Amount" id="payment2" name="payment2" onChange={(e) => this.updateAmounts(e)}/>
            </div>
          </div>
          <div className="col-xs-6">
            <label htmlFor="payment2Type" className="col-xs-12 col-form-label">Payment Type</label>
            <div className="col-xs-12">
                <select className="form-control" ref={(input) => this.payment2Type = input} id="payment2Type" name="payment2Type"  >
                    <option value="Chash">Cash</option>
                    <option value="Transfer">Transfer</option>
                </select>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="balance" className="col-xs-12 col-form-label">Balance</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.balance = input} type="number" placeholder="Amount" id="balance" name="balance" readOnly />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="description" className="col-xs-12 col-form-label">Description</label>
          <div className="col-xs-12">
            <textarea className="form-control" ref={(input) => this.description = input} type="text" placeholder="Description" id="description" name="description"></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Order</button>
      </form>
    )
  }
}

AddOrderForm.propTypes = {
  // addOrder: React.PropTypes.func.isRequired
}

export default AddOrderForm;