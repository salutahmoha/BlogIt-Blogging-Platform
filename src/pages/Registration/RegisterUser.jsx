import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import apiBase from '../../utils/apiBase';
import toast from "react-simple-toasts";
import useStore from '../../store/useStore.js';
import "react-simple-toasts/dist/style.css";
import './registerUser.css';

function RegisterUser() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState(null);

    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation({
        mutationFn: async function (newUser) {
            const response = await fetch(`${apiBase}/users`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            toast("Registration Successful", {
                theme: "toast-success",
                duration: 3000,
            });
            navigate('/SignIn');
        },
        onError: (error) => {
            toast(error.message, {
                theme: "toast-error",
                duration: 3000,
            });
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setFormError("Password and confirm password do not match");
            return;
        }
        setFormError(null); 
        const formData = { firstName, lastName, emailAddress, username, password };
        mutate(formData);
    }

    const handleLogin = () => {
        navigate('/SignIn');
    }

    return (
        <div className='register'>
            <form className='form' onSubmit={handleSubmit}>
                <h3>Create an account here</h3>
                <label htmlFor="firstname">First Name</label>
                <input type="text" id='firstname' placeholder='Enter your first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required /><br />

                <label htmlFor="lastname">Last Name</label>
                <input type="text" id='lastname' placeholder='Enter your last name' value={lastName} onChange={(e) => setLastName(e.target.value)} required/><br />

                <label htmlFor="email">Email</label>
                <input type="email" id='email' placeholder='Enter your email' value={emailAddress} onChange={(e) => setEmail(e.target.value)} required /><br />

                <label htmlFor="username">Username</label>
                <input type="text" id='username' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} required/><br />

                <label htmlFor="password">Password</label>
                <input type="password" id='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label htmlFor="confirmpassword">Confirm Password</label>
                <input type="password" id='confirmpassword' placeholder='Confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> <br /><br />

                {formError && <div className="error">{formError}</div>} 

                <button type='submit' className='create-account' disabled={isLoading}> 
                    {isLoading ? 'Loading, please wait...' : 'Submit'}
                </button>

                <div className="login-button">
                    <p>Already have an account?</p>
                    <button className='btn-register-login' onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterUser;
