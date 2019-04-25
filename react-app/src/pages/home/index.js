/**
 * @file 登录页
 * @author: dingjia
 * */

import React, {Component} from 'react';
import WrapperedUserForm from '@/components/LoginForm';
import {signin, signup} from '@/service/user';
import {message} from 'antd';

export default class Home extends Component {
    handleSubmit = (isRegister, user) => {
        const service = isRegister ? signup : signin;
        service(user).then(({code, data, error}) => {
            if (code === 0) {
                if (!isRegister) {
                    // console.log(data);
                    sessionStorage.setItem('username', data.username);
                }
                this.props.history.push('/admin');
            }
            else {
                message.error(error);
            }
        });
    }

    render() {
        return (
            <div className='home-page'>
                <div className='login-form'>
                    <h1>hello world</h1>
                    <WrapperedUserForm onSubmit={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}
