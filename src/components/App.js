import React from 'react';
import Order from './orders/Order';
import AddOrderForm from './orders/AddOrderForm';
import OrderDetail from './orders/OrderDetail';
import Nav from './Nav';
import base from '../base';

class App extends React.Component{
    constructor() {
      super();
      // Bind functions to the app
      this.getOrderDetail = this.getOrderDetail.bind(this);

      // getinitialstate
      this.state = {
        orders: {},
        order: {}
      };
    }

    // React Lifecyle method
    // facebook.github.io/react/docs/component-specs.html
    // This component runs right before the <App> is rendered.
    componentWillMount(){

      const DbRef = base.database().ref('orders');
      DbRef.on('value', (snapshot) => {
        const data = snapshot.val() || {};
        
        // OrderActions.updateOrder(data)
        this.setState({orders:data});

        document.getElementsByClassName('loading')[0].style.display = 'none';
        document.getElementsByClassName('orders')[0].classList.remove('invisible');

      });

    }
    componentWillUnmount(){
        base.removeBinding(this.DbRef);
    }
    // It will runs when state or props change
    componentWillUpdate(nextProps, nextState){
        // Using {} actually will go directly to the object
        // localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }
    getOrderDetail(e, key){
      e.preventDefault();
      const orders = {...this.state.orders};
      const order = orders[key].order;
      this.setState({
        order: order
      })
    }
    render(){
        return (
            <div className="row">
                <Nav/>
                <img src="../img/ring.svg" alt="loading" height="40" width="40" className="loading"/>
                <Order 
                    orders={this.state.orders}
                    getOrderDetail={this.getOrderDetail}
                    // params={this.props.params}
                    // addOrder={this.addOrder}
                    // removeFromOrder={this.removeFromOrder}
                />
                <AddOrderForm />
                <OrderDetail 
                order={this.state.order} 
                />
            </div>
        )
    }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
// export default connectToStores(App);