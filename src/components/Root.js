import React from 'react';
import {BrowserRouter, Match, Miss} from 'react-router';

import App from './App';
import AddOrderForm from './orders/AddOrderForm';
import NotFound from './NotFound';

// Stateless functional component 
const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={App} />
                <Match exactly pattern="/addOrder" component={AddOrderForm} />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

export default Root;