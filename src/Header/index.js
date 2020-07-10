import React from 'react';
import SearchMovies from '../Search';
import Home from '../Home';
import Login from '../Login';
import logo from '../logo.png';
import { Nav, Navbar } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './header.css';

function Header() {
    return (
        <Router>
            <div className="app-header-container">
                <header className="app-header">
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand>
                            <Link className="link" to="/">
                                <img src={logo} className="logo-header" />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Link className="link" to="/searchmovies">Search Movies</Link>
                            </Nav>
                            <Nav>
                                <Link className="link" to="/signin">Sign In</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
            </div>

            <Switch>
                <Route path="/searchmovies">
                    <SearchMovies />
                </Route>
                <Route path="/signin">
                    <Login />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default Header;
