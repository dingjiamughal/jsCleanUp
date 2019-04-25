import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {withRouter} from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <Menu
                style={{width: '100%'}}
                defaultSelectedKeys={[window.location.hash.slice(1)]}
                mode="inline"
                onClick={this.handleClick}
            >
                <Menu.Item key='/admin'><Icon type='lock'></Icon>首页</Menu.Item>
                <Menu.Item key='/admin/category'><Icon type='lock'></Icon>分类管理</Menu.Item>
                <Menu.Item key='/admin/article'><Icon type='user'></Icon>文章管理</Menu.Item>
            </Menu>
        );
    }
    handleClick = ({key}) => {
        this.props.history.push(key);
    }
}

export default withRouter(Nav);
