import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Input, notification } from 'antd';
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginEmail: undefined,
            loginPassword: undefined,
            loginLoading: false,
        };

        this.apiLink = process.env.REACT_APP_LOCAL_SERVER;
    }

    resetState(){
        this.setState({ 
            loginEmail: undefined,
            loginPassword: undefined,
            loginLoading: false,
        });
    }

    loginUser = () => {
        const { email, password } = this.state;
          
        axios.post(`${this.apiLink}/user/login.php`, { data: { email, password } })
        .then(res => res.data)
        .then(res => {
            this.resetState();             
            this.openNotification("Login Successful", "Welcome! You are a part of our.", 'success');
        })
        .catch(error => {
            this.setState({ registerLoading: false });
            this.openNotification("Internal Error", "There was an internal server error", 'error');
        });
    }

    openNotification(message, description, type = 'error'){
        const color = type === 'success'? '#b7eb8f' : '#ffccc7';

        notification.success({
            message,
            description,
            style: { backgroundColor: color }
        });
    }

    render() {
        return <div class="container login-container">
            <br/><br/><br/>
            <div class="row">
                <div class="col-lg-6 register-background-image login-form-height no-padding">
                    <div class="primary-background-login">
                        <div class="user-form-title-login lato lato-900 color-white">Welcome to Cozy Potato!</div>
                        <div class="user-form-subtitle-login lato lato-300 color-white mt-2">
                            Find your next favorite movie to watch. Review movies. <br/>
                            Recommend movies to friends and family and much more.
                        </div>
                        <Link to="/register"><div class="user-form-button-login lato lato-300 mt-3">Register</div></Link>
                    </div>
                </div>

                <div class="col-lg-6 no-padding">
                    <div class="form-border-login mb-4">
                        <Input
                            value={this.state.loginEmail}
                            onChange={(e) => this.setState({ loginEmail: e.target.value })}
                            placeholder="Enter your email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />

                        <Input.Password
                            value={this.state.loginPassword}
                            onChange={(e) => this.setState({ loginPassword: e.target.value })}
                            className="mt-4"
                            placeholder="Enter password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        /><br />

                        <Button className="mt-4" type="primary" onClick={this.loginUser} danger loading={this.state.loginLoading}>Sign In</Button>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
        </div>
    }
}

export default Login;
