import alt from '../alt';

class OrderActions {
  updateOrder(order) {
    return { order }
  }
}

export default alt.createActions(OrderActions);