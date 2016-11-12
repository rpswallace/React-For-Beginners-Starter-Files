// React
import React from 'react';
import {render} from 'react-dom';
import bootstrap from 'bootstrap';

// Styles
import './css/vendors.css';
import './css/main.css';

// Custom components
import Root from './components/Root'


render(<Root/>, document.querySelector('#main'));