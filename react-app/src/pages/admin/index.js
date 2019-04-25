/**
 * @file admin
 * @author: dingjia
 * */

import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Row, Col} from 'antd';
import Header from '@/components/Header';
import NavLeft from '@/components/NavLeft';
import Category from '@/components/category';
import Article from '@/components/article';
import Welcome from '@/components/Welcome'

export default class Admin extends Component {
    render() {
        return (
            <Row className='admin-page'>
                <Col span={24}>
                    <Header />
                    <Row>
                        <Col span={4}>
                            <NavLeft />
                        </Col>
                        <Col span={20}>
                            <Route path='/admin' component={Welcome}/>
                            <Route path='/admin/category' component={Category} exact/>
                            <Route path='/admin/article' component={Article}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
