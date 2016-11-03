import React from 'react';
import {BrowserRouter, Match, Miss} from 'react-router';

import App from './App';
import NotFound from './NotFound';

// Stateless functional component 
const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={App} />
                <Match pattern="/store/:storeId" component="" />
                <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

export default Root;