import React, {Component} from 'react';
import {Col, Row, Icon} from 'antd';

export default class Header extends Component {
    render() {
        return (
            <Row className='admin-header'>
                <Col span="6">
                    <h2>title</h2>
                </Col>
                <Col span="18">
                    <div className='header-op-wrapper'>
                        <Icon type='smile' /> 欢迎 111 登录
                        <Icon type='logout' /> 退出
                    </div>
                </Col>
            </Row>
        );
    }
}
