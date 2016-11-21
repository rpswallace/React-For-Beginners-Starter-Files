import React from 'react';

class Modal extends React.Component{
  constructor(props) {
    super();
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    // e.preventDefault();
    // this.props.Modal(this.dateFrom.value, this.dateTo.value, this.status.value);
  }
  render(){
      return (
        <div>
          <div className="modal fade bd-example-modal-sm" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                sure
              </div>
            </div>
          </div>
        </div>
      )
  }
}

Modal.propTypes = {
    // orders: React.PropTypes.object.isRequired
    // removeFromOrder: React.PropTypes.func.isRequired
}

export default Modal;