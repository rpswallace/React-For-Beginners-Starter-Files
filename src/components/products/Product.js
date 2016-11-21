import React from 'react';
// import {formatPrice} from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Product extends React.Component{
    constructor() {
        super();
        this.renderProduct = this.renderProduct.bind(this);
    }
    // This is not a specific one from React, was made separate a bit the code.
    renderProduct(key){
        const product = this.props.products[key];
        const removeButton = <button onClick={() => this.props.removeFromProduct(key)}>&times;</button>;
        const productStatus = (parseInt(product.status, 10)) ? 'card-success' : 'card-warning';

        if(!product || product.status === 'unavailable'){
            return <li key={key}>Sorry, {product ? product.name : 'product'} is not longer available! {removeButton}</li>
        }
        return(
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={key}>
            <div className={'card ' + productStatus}>
              <img className="card-img-top" src="" role="presentation" />
              <div className="card-block">
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text"><b>Price:</b> {product.price}</p>
                <p className="card-text"><b>Type:</b> {product.type}</p>
                <a href="#" className="card-link" onClick={(e) => this.props.getProductDetail(e, key) }>Details</a>
                <a href="#" className="card-link" onClick={(e) => this.props.getProductDetail(e, key) }>Edit</a>
              </div>
            </div>
          </div>
        )
    }
    render(){
        const productIds = Object.keys(this.props.products);
        return (
              <CSSTransitionGroup 
                  className="products col-xs-12"
                  component="div"
                  transitionName="order"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                  >
                      {productIds.map(this.renderProduct)}
              </CSSTransitionGroup>
        )
    }
}

Product.propTypes = {
    products: React.PropTypes.object.isRequired
    // removeFromProduct: React.PropTypes.func.isRequired
}

export default Product;