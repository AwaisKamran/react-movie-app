import React from 'react';
import { Button, Input, Space, Tooltip } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import './login.css';

class Login extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return <div class="login-container">
            <Space direction="vertical">
                <Input
                    placeholder="Enter your email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                />

                <Input.Password
                    placeholder="input password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />

                <Button type="primary" danger loading>Loading</Button>
            </Space>
        </div>
    }
}

export default Login;
