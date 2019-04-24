import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Home from '@/pages/home';
import Signup from '@/pages/home/signup';

function Admin() {
    return <div>admin</div>;
}

export default class Routers extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/signup' component={Signup}></Route>
                </Switch>
            </Router>
        );
    }
}