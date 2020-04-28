import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoreProvider from '../hooks/Provider';
import RoutesPrivate from './Private';

import Area from '../pages/Areas';
import Login from '../pages/Login';

const Routes = () => (
    <Router>
        <StoreProvider>
            <Switch>
                <Route path="/" exact component={Login} />
                <RoutesPrivate path="/areas" component={Area} />
            </Switch>
        </StoreProvider>
    </Router>
);

export default Routes;