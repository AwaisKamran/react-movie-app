import React from 'react';
import { Button, Input, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div class="container login-container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-border mb-4">
                        <div class="title">Become a member</div>

                        <Input
                            placeholder="Enter your email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />

                        <Input
                            className="mt-4"
                            placeholder="First Name"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />

                        <Input
                            className="mt-4"
                            placeholder="Last Name"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />

                        <Input.Password
                            className="mt-4"
                            placeholder="Enter password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />

                        <Input.Password
                            className="mt-4"
                            placeholder="Confirm password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        /><br />

                        <Button className="mt-4" type="primary" danger loading>Sign Up</Button>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="form-border mb-4">
                        <div class="title">Sign In</div>
                        
                        <Input
                            placeholder="Enter your email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />

                        <Input.Password
                            className="mt-4"
                            placeholder="Enter password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        /><br />

                        <Button className="mt-4" type="primary" danger loading>Sign In</Button>
                    </div>
                </div>
            </div><br /><br />
        </div>
    }
}

export default Login;
