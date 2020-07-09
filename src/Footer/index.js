import React from 'react';
import logo from '../logo.png';
import './footer.css';

function Footer() {
    return (
        <div className="footer-container">
            <footer className="footer bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-single">
                                <img src={logo} className="logo-footer" /><br />
                                <p className="mt-2">eusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-single">
                                <p>eusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-single">
                                <h6>Explore</h6>
                                <ul>
                                    <li><a href="#">Inside Us</a></li>
                                    <li><a href="#">Flickr</a></li>
                                    <li><a href="#">Google</a></li>
                                    <li><a href="#">Forum</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="footer-single">
                                <h6>Support</h6>
                                <ul>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Market Blog</a></li>
                                    <li><a href="#">Help Center</a></li>
                                    <li><a href="#">Pressroom</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="copyright text-center">
                    Copyrght © 2020 Cozy Potato Community. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default Footer;
