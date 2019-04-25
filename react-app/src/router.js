/**
 * @file router.js
 * @author: dingjia
 * */

import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {createHashHistory} from 'history';
import Home from '@/pages/home';
import Admin from '@/pages/admin';

const history = createHashHistory();
history.listen(loc => {
    if (loc.pathname === '/admin' && !sessionStorage.getItem('username')) {
        // history.push('/');
    }
});

export default class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/admin' component={Admin}></Route>
                </Switch>
            </Router>
        );
    }
}
