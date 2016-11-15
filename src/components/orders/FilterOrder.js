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
          <label htmlFor="date-from" className="col-xs-3 col-sm-2 col-md-1 col-form-label">From:</label>
          <div className="col-xs-9 col-sm-4 col-md-3 ">
            <input className="form-control" ref={(input) => this.dateFrom = input} type="date" defaultValue="" id="date-from" name="dateFrom"/>
          </div>
          <label htmlFor="date-to" className="col-xs-3 col-sm-2 col-md-1 col-form-label">To:</label>
          <div className="col-xs-9 col-sm-4 col-md-3">
            <input className="form-control" ref={(input) => this.dateTo = input} type="date" defaultValue="" id="date-to" name="dateTo"/>
          </div>
          <label htmlFor="status" className="col-xs-3 col-sm-2 col-md-1 col-form-label">Status:</label>
          <div className="col-xs-9 col-sm-4 col-md-3">
            <select className="form-control" ref={(input) => this.status = input} id="status" name="status"  >
                <option value="none">Select one</option>
                <option value="1">Confirm</option>
                <option value="0">Not confirm</option>
            </select>
          </div>
          <div className="col-xs-12">
            <button type="submit" className="btn btn-primary">Filter</button>
          </div>
        </form>
      )
  }
}

FilterOrder.propTypes = {
    // orders: React.PropTypes.object.isRequired
    // removeFromOrder: React.PropTypes.func.isRequired
}

export default FilterOrder;