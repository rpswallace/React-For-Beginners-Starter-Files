import React from 'react';
import Order from './Order';
import sampleOrders from '../sample-orders';
import base from '../base';

class App extends React.Component{
    constructor() {
      super();
      // Bind functions to the app
      this.addFish = this.addFish.bind(this);
      this.loadSamples = this.loadSamples.bind(this);
      this.addToOrder = this.addToOrder.bind(this);
      this.removeFromOrder = this.removeFromOrder.bind(this);
      this.updateFish = this.updateFish.bind(this);
      this.removeFish = this.removeFish.bind(this);

      // getinitialstate
      this.state = {
        fishes: {},
        orders: sampleOrders
      };
    }
    // React Lifecyle method
    // facebook.github.io/react/docs/component-specs.html
    // This component runs right before the <App> is rendered.
    componentWillMount(){
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {context: this, state: 'fishes'});

        // check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if(localStorage){
            // update our App component order state
            if(JSON.parse(localStorageRef)){
                this.setState({
                    order: JSON.parse(localStorageRef)
                })
            }
        }
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    // It will runs when state or props change
    componentWillUpdate(nextProps, nextState){
        // Using {} actually will go directly to the object
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }
    addFish(fish){
        // It's a good practice clone initial state
        // ... takes every item form a object and paste it into a new one, basically it makes a copy/clone.
        const fishes = {...this.state.fishes}

        // add in our new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // update our state

        // set state
        // Other way to do it if the name is the same we can do this.setState({fishes})
        this.setState({
            fishes: fishes
        })
        
    }
    updateFish(key, updatedFish){
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }
    removeFish(key){
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    }
    loadSamples(){
        this.setState({
            orders: sampleOrders
        });
    }
    addToOrder(key){
        // Copy of the existing orders state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        // update state
        this.setState({order});
    }
    removeFromOrder(key){
        // Mine 
        // const order = {...this.state.order};
        // const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        // if(localStorageRef){
        //     const storeOrder = JSON.parse(localStorageRef);
        //     if(storeOrder[key]){
        //         delete storeOrder[key];
        //     }
        //     this.setState({
        //         order: storeOrder
        //     });
        //     localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(storeOrder));
        // }

        // It not necessary update localStorage again because componentWillUpdate will runs when state or props change 
        // Wes
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }
    render(){
        return (
            <div className="row">
                <Order 
                    orders={this.state.orders}
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />
            </div>
        )
    }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;