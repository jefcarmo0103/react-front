import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoreProvider from '../hooks/Provider';
import { ToastProvider } from '../hooks/toast';
import RoutesPrivate from './Private';

import Area from '../pages/Areas';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

const Routes = () => (
    <Router>
        <StoreProvider>
            <ToastProvider>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/cadastro" component={Cadastro} />
                    <RoutesPrivate path="/areas" component={Area} />
                </Switch>
            </ToastProvider>
        </StoreProvider>
    </Router>
);

export default Routes;
