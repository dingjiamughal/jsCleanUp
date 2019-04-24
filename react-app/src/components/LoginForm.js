/**
 * @file 登录页表单
 * @author: dingjia
 * */

import React, {Component} from 'react';
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox
} from 'antd';

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            register: '/signup',
            forget: '/forget',
            isRegister: true
        };
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={e => {
                e.preventDefault();
                this.props.onSubmit(
                    this.state.isRegister,
                    this.props.form.getFieldsValue()
                );
            }}>
                <Form.Item>
                    {
                        getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名'}]
                        })(
                            <Input prefix={<Icon type='user' />} placeholder='请填写用户名' />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}]
                    })(
                        <Input prefix={<Icon type='lock' />} type='password' placeholder='请填写密码' />
                    )}
                </Form.Item>
                {
                    this.state.isRegister && <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: '请输入邮箱'}]
                        })(
                            <Input prefix={<Icon type='desktop' />} type='email' placeholder='请填写邮箱' />
                        )}
                    </Form.Item>
                }

                <Form.Item>
                    {
                        !this.state.isRegister &&
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )
                    }
                    {
                        !this.state.isRegister && <a className='login-form-forgot' href='javascript:void(0)' onClick={() => {this.setState({isRegister: true})}}>忘记密码</a>
                    }
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                        {this.state.isRegister ? '注册' : '登录'}
                    </Button>
                    {/* {
                        this.state.isRegister && <a href={this.state.register}>register now!</a>
                    } */}
                    <a href='javascript:void(0)' onClick={() => {this.setState({isRegister: !this.state.isRegister})}}>
                        {this.state.isRegister ? '已有帐号，立即登录' : '没有账号，立即注册'}
                    </a>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(UserForm);
