import React, { useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth"
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (event) => {
        // 1. prevent page refresh
        event.preventDefault();
        setSuccess('');
        setError('');
        // 2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        // Validate
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError("Please add at least two uppercase");
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError("Please add at least two number");
            return;
        }
        else if (password.length < 6) {
            setError("Please add at least 6 characters in your password");
            return;
        }

        // 3. Create user in Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError("");
                event.target.reset();
                setSuccess("Register Successful");
                sendVerificationEmail(result.user);
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
                setSuccess("");
            })
    };

    const sendVerificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Please verify your email address');
            })
            
    }

    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value);
    };

    const handlePasswordBlur = (event) => {
        // console.log(event.target.value);
    };

    return (
        <div className="register-form">
            <h2 className="register-title">Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleEmailChange}
                    className="input-field"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required
                />{" "}
                <br />
                <input
                    onBlur={handlePasswordBlur}
                    className="input-field"
                    type="Password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    required
                />{" "}
                <br />
                <input className="btn-submit" type="submit" value="Register" />
            </form>

            <p className="mt-2"><small>Already have an account? Please <Link to="/login">Login</Link> </small></p>
            <p className="text-danger">{error}</p>
            <p className="text-success">{success}</p>
        </div>
    );
};

export default Register;

