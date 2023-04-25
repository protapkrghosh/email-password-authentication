import React, { useState } from "react";
import "./Register.css";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth"
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
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password);

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
                updateUserData(result.user, name);
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

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('user name updated');
            })
            .catch(error => {
                setError(error.message);
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
                    className="input-field"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="User Name"
                    required
                />{" "}
                <br />
                <input
                    onChange={handleEmailChange}
                    className="input-field"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    required
                />{" "}
                <br />
                <input
                    onBlur={handlePasswordBlur}
                    className="input-field"
                    type="Password"
                    name="password"
                    id="password"
                    placeholder="Password"
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

