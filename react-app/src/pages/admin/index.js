/**
 * @file admin
 * @author: dingjia
 * */

import React, {Component} from 'react';
import {Row, Col} from 'antd';
import Header from '@/components/Header';
import NavLeft from '@/components/NavLeft';
import category from '@components/category';
import article from '@components/article';
import {Route} from 'react-router-dom';

export default class Admin extends Component {
    render() {
        return (
            <Row className='admin-page'>
                <Col span={24}>
                    <Header />
                    <Row>
                        <Col span={3}>
                            <NavLeft />
                        </Col>
                        <Col span={21}>
                            <Route path='/admin/category' component={category}/>
                            <Route path='/admin/article' component={article}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
