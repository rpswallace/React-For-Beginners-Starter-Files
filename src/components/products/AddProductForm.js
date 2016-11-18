import React from 'react';
import base from '../../base';

class AddProductForm extends React.Component{
  createProduct(e){
    e.preventDefault();
    const product = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      image: this.image.value,
      type: this.type.value
    }

    const productsRef = base.database().ref('products');
    const timestamp = Date.now();
    productsRef.child(`product-${timestamp}`).set(product);

    // Clear form inputs after submission
    this.productForm.reset();
  }
  updateAmounts(e){
    const balance = parseInt(document.getElementById('total').value, 10) - ((parseInt(document.getElementById('payment1').value, 10) || 0) + (parseInt(document.getElementById('payment2').value, 10) || 0));

    if(!isNaN(balance)){
      document.getElementById('balance').value = balance;
    }
  }
  render(){
    return (
      <form ref={(input) => this.productForm = input} className="product-edit" onSubmit={(e) => this.createProduct(e)}>
        <div className="form-group row">
          <label htmlFor="name" className="col-xs-12 col-form-label">Name</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.name = input} type="text" placeholder="Name" id="name" name="name" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="price" className="col-xs-12 col-form-label">Price</label>
          <div className="col-xs-12">
            <input className="form-control" ref={(input) => this.price = input} type="number" placeholder="Price" id="price" name="price" />
          </div>
        </div>
        <div className="form-group row">
            <label htmlFor="status" className="col-xs-12 col-form-label">Status</label>
            <div className="col-xs-12">
                <select className="form-control" ref={(input) => this.status = input} id="status" name="status"  >
                    <option value="1">Available</option>
                    <option value="0">Not Available</option>
                </select>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="type" className="col-xs-12 col-form-label">Type</label>
            <div className="col-xs-12">
                <select className="form-control" ref={(input) => this.type = input} id="type" name="type"  >
                    <option value="box">Box</option>
                    <option value="bag">Bag</option>
                </select>
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="image">File input</label>
          <input type="file" className="form-control-file" ref={(input) => this.image = input} id="image" name="image" aria-describedby="fileHelp" />
          <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    )
  }
}

AddProductForm.propTypes = {
  // addProduct: React.PropTypes.func.isRequired
}

export default AddProductForm;