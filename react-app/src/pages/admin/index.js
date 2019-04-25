/**
 * @file admin
 * @author: dingjia
 * */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import Header from '@/components/Header';

export default class Admin extends Component {
    render() {
        return (
            <Row className='admin-page'>
                <Col span="24">
                    <Header></Header>
                </Col>
            </Row>
        );
    }
}
