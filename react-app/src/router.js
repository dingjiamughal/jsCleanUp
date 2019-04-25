import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Home from '@/pages/home';
import Admin from '@/pages/admin';

export default class Routers extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/admin' component={Admin}></Route>
                </Switch>
            </Router>
        );
    }
}