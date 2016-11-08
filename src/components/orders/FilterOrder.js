import React from 'react';

class FilterOrder extends React.Component{
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.filterOrder(this.dateFrom.value, this.dateTo.value, this.status.value);
  }
  render(){
      return (
        <form ref={(input) => this.orderFilterForm = input} className="order-filter" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group row">
              <label htmlFor="date-from" className="col-xs-2 col-form-label">From:</label>
              <div className="col-xs-6">
                <input className="form-control" ref={(input) => this.dateFrom = input} type="date" defaultValue="" id="date-from" name="dateFrom"/>
              </div>
              <label htmlFor="date-to" className="col-xs-2 col-form-label">To:</label>
              <div className="col-xs-6">
                <input className="form-control" ref={(input) => this.dateTo = input} type="date" defaultValue="" id="date-to" name="dateTo"/>
              </div>
            </div>
            <select className="form-control" ref={(input) => this.status = input} id="status" name="status"  >
                <option value="1">Confirm</option>
                <option value="0">Not confirm</option>
            </select>
            <button type="submit" className="btn btn-primary">Add Order</button>
          </form>
      )
  }
}

FilterOrder.propTypes = {
    // orders: React.PropTypes.object.isRequired
    // removeFromOrder: React.PropTypes.func.isRequired
}

export default FilterOrder;