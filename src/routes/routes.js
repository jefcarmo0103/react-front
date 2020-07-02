import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoreProvider from '../hooks/Provider';
import { ToastProvider } from '../hooks/toast';
import RoutesPrivate from './Private';

import Home from '../pages/Home';
import Login from '../pages/Login';

const Routes = () => (
    <Router>
        <StoreProvider>
            <ToastProvider>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <RoutesPrivate path="/home" component={Home} />
                </Switch>
            </ToastProvider>
        </StoreProvider>
    </Router>
);

export default Routes;
