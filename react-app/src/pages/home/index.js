import React, {Component} from 'react';
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox
} from 'antd';
export default class Home extends Component {
    handleSubmit = (user) => {
        console.log(user);
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

class UserForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={(e) => {
                e.preventDefault();
                this.props.onSubmit(
                    this.props.form.getFieldsValue()
                )
            }}>
                <Form.Item>
                    {
                        getFieldDecorator('username', {
                            rules: [{required: true, message: '请输入用户名'}]
                        })(
                            <Input prefix={<Icon type='user' />} placeholder='Username' />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码'}]
                    })(
                        <Input prefix={<Icon type='lock' />} type='password' placeholder='Password' />
                    )}
                </Form.Item>

                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className='login-form-forgot' href=''>Forgot password</a>
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                        Log in
                    </Button>
                    Or <a href=''>register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

const WrapperedUserForm = Form.create()(UserForm);
