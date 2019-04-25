import React, {Component} from 'react';
import {Menu, Icon} from 'antd';

export default class Nav extends Component {
    render() {
        return (
            <Menu
                style={{width: 256}}
                defaultSelectedKeys={['category']}
                mode="inline"
            >
                <Menu.Item key='category'><Icon type='lock'></Icon>分类管理</Menu.Item>
                <Menu.Item key='article'><Icon type='user'></Icon>文章管理</Menu.Item>
            </Menu>
        );
    }
}
