import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">login</Link>
                <Link to="/register">Register</Link>
                <Link to="/register-rbs">Register-RBS</Link>
                <Link to="/register-bs">Register-BS</Link>
            </nav>
        </div>
    );
};

export default Header;
