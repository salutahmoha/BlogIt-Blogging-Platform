import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query';
import './SignIn.css'
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";
import useUserStore from '../../store/useStore';
import apiBase from '../../utils/apiBase';

function SignIn() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    const { mutate, isLoading } = useMutation({ 
        mutationFn: async (userObj) => {
            const response = await fetch(`${apiBase}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(userObj),
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: (user) => {
            setUser(user);
            navigate("/BlogListings");
            toast("Login Successful", { theme: "toast-success", duration: 3000 });
        },
        onError: (error) => {
            toast(error.message, { theme: "toast-error", duration: 2000 });
        }
    });

    const handleSignUp = (e) => {  
        e.preventDefault();
        navigate('/RegisterUser');
    };

    function handleSubmit (e) {
        e.preventDefault();
        if (!identifier) {
            return toast("Email or Username is required", { theme: "toast-error", duration: 3000 });
        }
        if (!password) {
            return toast("Password is required", { theme: "toast-error", duration: 3000 });
        }
        mutate({ identifier, password });
    }

    return (
        <div className="signin-container">
            <form className="form signin-form" onSubmit={handleSubmit}>
                <h3>Welcome Back</h3>
                <label htmlFor="identifier">Email or Username</label>
                <input type="text" id="identifier" placeholder="Enter your email or username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required/><br />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/><br /><br /><br />

                <button type="submit" className="create-account" disabled={isLoading}>
                    {isLoading ? "Please wait..." : "Login"}
                </button>

                <div className="login-button">
                    <p>Don't have an account?</p>
                    <button className="btn-register-login" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
