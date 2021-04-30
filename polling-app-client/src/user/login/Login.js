import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants/index';

import { Form, Input, Button, notification } from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

const FormItem = Form.Item;

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <LoginForm onLogin={this.props.onLogin}/>
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleSubmit = (values) => {
                const loginRequest = Object.assign({},values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN,response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Polling App',
                            description: 'Your username or password is incorrect. Please try again!'
                        });
                    } 
                });
    }

    render() {
        return (
            <Form onFinish={(values) => this.handleSubmit(values)} className="login-form">
                <FormItem name="usernameOrEmail" rules={ [{required: true, message: 'Please input your username or email'}]}>
                    <Input prefix={<UserOutlined />}
                            size="large"
                            placeholder="Username or Email"/>
                </FormItem>
                <FormItem name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input 
                        prefix={<LockOutlined />}
                        size="large" 
                        type="password" 
                        placeholder="Password"  />                        
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit"  size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
            </Form>
        ); 
    }
}

export default Login;