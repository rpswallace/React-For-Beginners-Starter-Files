import React from 'react';
// Orders
import Order from './orders/Order';
import AddOrderForm from './orders/AddOrderForm';
// import EditOrderForm from './orders/EditOrderForm';
// import OrderDetail from './orders/OrderDetail';
// Products
import Product from './products/Product';
import AddProductForm from './products/AddProductForm';
// Filters
import FilterOrder from './orders/FilterOrder';
import Nav from './Nav';
import base from '../base';

class App extends React.Component{
    constructor() {
      super();
      // Bind functions to the app
      this.getOrderDetail = this.getOrderDetail.bind(this);
      this.updateOrder = this.updateOrder.bind(this);
      this.filterOrder = this.filterOrder.bind(this);

      // getinitialstate
      this.state = {
        orders: {},
        order: {},
        products: {}
      };
    }

    // React Lifecyle method
    // facebook.github.io/react/docs/component-specs.html
    // This component runs right before the <App> is rendered.
    componentWillMount(){

      const DbRef = base.database().ref('orders');
      DbRef.on('value', (snapshot) => {
        const data = snapshot.val() || {};
        
        this.setState({orders:data});

        // document.getElementsByClassName('loading')[0].style.display = 'none';
        document.getElementsByClassName('orders')[0].classList.remove('invisible');

      });

      const DbRefProduct = base.database().ref('products');
      DbRefProduct.on('value', (snapshot) => {
        const data = snapshot.val() || {};
        this.setState({products:data});
      });

    }
    componentWillUnmount(){
        base.removeBinding(this.DbRef);
        base.removeBinding(this.DbRefProduct);
    }
    // It will runs when state or props change
    componentWillUpdate(nextProps, nextState){

      // update localstorage for ordersdetails
      // 
      // 
        // Using {} actually will go directly to the object
        // console.log(nextProps, nextState);
        // localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }
    getOrderDetail(e, key){
      // e.preventDefault();
      const orders = {...this.state.orders};
      const order = orders[key].order;
      localStorage.setItem(`order-${key}`, JSON.stringify(order));
      // this.setState({
      //   order: order,
      //   id: key
      // })
    }
    filterOrder(dateFrom, dateTo, status){
      // console.log(dateFrom, dateTo, status);
      // 
      var filteredOrders = {};
       
      var ref = base.database().ref("orders");
      ref.on("value", (snapshot) => {
        const orders = snapshot.val() || {};
        const orderIds = Object.keys(orders);
        orderIds.filter(function (key) {

          
          // both dates and status
          if((dateFrom && dateTo) && (status != 'none')){
            if((orders[key].order.deliveryDate >= dateFrom) && 
              (orders[key].order.deliveryDate <= dateTo) && 
              (orders[key].order.status == status)
              ){
              filteredOrders[key] = orders[key];
              return false;
            }
          }
          // both dates, no status
          else if((dateFrom && dateTo) && (status == 'none')){
            if((orders[key].order.deliveryDate >= dateFrom) && (orders[key].order.deliveryDate <= dateTo)){
              filteredOrders[key] = orders[key];
              return false;
            }
          }
          // no dates, just status
          else if((!dateFrom && !dateTo) && (status != 'none')){
            if(orders[key].order.status == status){
              filteredOrders[key] = orders[key];
              return false;
            }
          }
          else{
            filteredOrders = orders;
          }
        });
        this.setState({orders: filteredOrders});
      });

    }
    updateOrder(updatedOrder){
        let order = {...this.state.order};
        order = updatedOrder;

        this.DbRef = base.database().ref('orders');
        this.DbRef.child(this.state.id).set({order});
        this.setState({order});
    }
    render(){
        return (
            <div className="row">
                <Nav/>
                <div className="tab-content">
                  <div className="tab-pane active" id="orders" role="tabpanel">
                    <FilterOrder 
                    filterOrder={this.filterOrder}
                    />
                    <Order 
                    orders={this.state.orders}
                    getOrderDetail={this.getOrderDetail}
                />

                  </div>
                  <div className="tab-pane" id="addOrders" role="tabpanel">
                    <AddOrderForm 
                      products={this.state.products}
                    />
                    </div>
                  <div className="tab-pane" id="products" role="tabpanel">
                    

                    <Product 
                      products={this.state.products} 
                      getProductDetail={this.getProductDetail}
                    />
                  </div>

                  <div className="tab-pane" id="addProducts" role="tabpanel">
                  <AddProductForm />
                  </div>
                </div>
                
                
                {/*
                
                <OrderDetail 
                order={this.state.order} 
                />
                
                <EditOrderForm 
                order={this.state.order}
                updateOrder={this.updateOrder}
                />

                */}
                

                
            </div>
        )
    }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
// export default connectToStores(App);