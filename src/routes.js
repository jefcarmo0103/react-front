import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Area from './pages/Area';
import Login from './pages/Login';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/areas" component={Area} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}