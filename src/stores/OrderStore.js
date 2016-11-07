import alt from '../alt';
import OrderActions from '../actions/OrderActions';

class OrderStore {
  constructor() {
    this.bindListeners({
      updateOrder: OrderActions.updateOrder
    });

    this.state = {
      orders: {}
    };
  }

  updateOrder(orders) {
    this.setState({ orders: orders });
  }
}

export default alt.createStore(OrderStore, 'OrderStore');