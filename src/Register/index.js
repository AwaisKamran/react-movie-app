import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Input, notification } from 'antd';
import axios from "axios";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import placeholder from '../images/profile-placeholder.jpg';
import './register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: undefined,
            lastName: undefined,
            displayName: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
            profilePicture: undefined,
            registerLoading: false,
            type: 1
        };

        this.apiLink = process.env.REACT_APP_LOCAL_SERVER;
        this.fileReference = React.createRef();
        this.uploadedImage = React.createRef();
    }

    resetState(){
        this.setState({ 
            firstName: undefined, 
            lastName: undefined, 
            displayName: undefined, 
            email: undefined, 
            password: undefined, 
            profilePicture: undefined, 
            type: undefined,
            registerLoading: false,
        });
    }

    registerUser = () => {
        if(this.state.password === this.state.confirmPassword){
            const { firstName, lastName, displayName, email, password, profilePicture, type } = this.state;
            const user = { firstName, lastName, displayName, email, password, profilePicture, type};

            this.setState({ registerLoading: true });
            axios.post(`${this.apiLink}/user/addUser.php`, { data: user })
                .then(res => res.data)
                .then(res => {
                    this.resetState();     
                    this.uploadedImage.style.backgroundImage = `url(${placeholder})`;;            
                    this.openNotification("User Registered", "Congratulations! you have registered successfully.", 'success');
                })
                .catch(error => {
                    this.setState({ registerLoading: false });
                    this.openNotification("Internal Error", "There was an internal server error", 'error');
                });
        }
        else{
           this.openNotification("Field Error", "Password fields don't match", 'error');
        }
    }

    openNotification(message, description, type = 'error'){
        const color = type === 'success'? '#b7eb8f' : '#ffccc7';

        notification.success({
            message,
            description,
            style: { backgroundColor: color }
        });
    }

    uploadImage = (e) => {
        if (e) {
            const [file] = e.target.files;
            if (file) {
                const reader = new FileReader();
                const { current } = this.uploadedImage;
                current.file = file;
                reader.onload = (e) => {
                    this.state.profilePicture = e.target.result;
                    current.style.backgroundImage = `url(${e.target.result})`;
                }
                reader.readAsDataURL(file);
            }
        }
    }

    render() {
        return <div class="container login-container">
            <div class="row">
                <div class="col-lg-6 register-background-image no-padding">
                    <div class="primary-background">
                        <div class="user-form-title lato lato-900 color-white">Welcome to Cozy Potato!</div>
                        <div class="user-form-subtitle lato lato-300 color-white mt-2">
                            Let the conversation begin! <br/>
                            Find your next favorite movie to watch. Review movies. <br/>
                            Recommend movies to friends and family and much more.
                        </div>
                        <Link to="/login"><div class="user-form-button lato lato-300 mt-4">Login</div></Link>
                    </div>
                </div>
                <div class="col-lg-5 no-padding register-form-height">
                    <div class="form-border mb-4"> 
                        <input type="file" ref={this.fileReference} accept="image/*" onChange={this.uploadImage} multiple="false" class="display-none" />
                        <div class="user-image" ref={this.uploadedImage} onClick={() => this.fileReference.current.click()}></div>

                        <Input
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                            placeholder="Enter your email"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />

                        <Input
                            value={this.state.firstName}
                            onChange={(e) => this.setState({ firstName: e.target.value })}
                            className="mt-4"
                            placeholder="First Name"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />

                        <Input
                            value={this.state.lastName}
                            onChange={(e) => this.setState({ lastName: e.target.value })}
                            className="mt-4"
                            placeholder="Last Name"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />

                        <Input
                            value={this.state.displayName}
                            onChange={(e) => this.setState({ displayName: e.target.value })}
                            className="mt-4"
                            placeholder="Display Name"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />

                        <Input.Password
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                            className="mt-4"
                            placeholder="Enter password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />

                        <Input.Password
                            value={this.state.confirmPassword}
                            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                            className="mt-4"
                            placeholder="Confirm password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        /><br />

                        <Button className="mt-4" type="primary" onClick={this.registerUser} danger loading={this.state.registerLoading}>Sign Up</Button>
                    </div>
                </div>
            </div><br /><br />
        </div>
    }
}

export default Register;
