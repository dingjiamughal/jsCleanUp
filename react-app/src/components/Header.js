/**
 * @file header.js
 * @author: dingjia
 * */

import React, {Component} from 'react';
import {Col, Row, Icon, message} from 'antd';
import {signout} from '@/service/user';
import {withRouter} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }
    componentWillMount() {
        const user = sessionStorage.getItem('username');
        this.setState({
            user
        });
    }
    render() {
        return (
            <Row className='admin-header'>
                <Col span={6}>
                    <h2 style={{margin: 0}}>title</h2>
                </Col>
                <Col span={18}>
                    <div className='header-op-wrapper'>
                        <Icon type='smile' /> {this.state.user}
                        <a href='javascript:void(0)' onClick={this.logout}>
                            <Icon type='logout' /> 退出
                        </a>

                    </div>
                </Col>
            </Row>
        );
    }

    logout = () => {
        signout().then(res => {
            if (res.code === 0) {
                sessionStorage.removeItem('username');
                this.props.history.push('/');
            }
            else {
                message.error(res.error);
            }
        });
    }
}

export default withRouter(Header);
