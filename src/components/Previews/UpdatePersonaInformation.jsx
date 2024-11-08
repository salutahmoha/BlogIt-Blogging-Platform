import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import apiBase from '../../utils/apiBase';
import toast from 'react-simple-toasts';
import "react-simple-toasts/dist/style.css";
import useUserStore from '../../store/useStore';
import './css/UpdatePersonalInformation.css';

function UpdatePersonalInformation() {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [emailAddress, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const user = useUserStore((state) => state.user);
   const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        if (user) {
            console.log("User data in useEffect:", user);
            setFirstname(user.firstName);
            setLastname(user.lastName );
            setEmail(user.emailAddress );
            setUsername(user.username  );
        }
    }, [user]);

    const { mutate, isLoading } = useMutation({
        mutationFn: async function (updatedUser) {
            const response = await fetch(`${apiBase}/users`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
                credentials: 'include'
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            const data = await response.json();
            return data;
        },
        onSuccess: (data) => {
            setUser(data);
            toast("Personal Information Updated", { theme: "toast-success", duration: 2000 });
        },
        onError: (error) => {
            toast(error.message, { theme: "toast-error", duration: 2000 });
        }
    });

    function handleUpdatePersonalInformation(e) {
        e.preventDefault();
        if (!firstName || !lastName || !emailAddress || !username) {
            toast("All fields are required", { theme: "toast-error", duration: 2000 });
            return;
        }

        mutate({ firstName, lastName, emailAddress, username });
    }

    if (!user) {
        return <div>Loading...</div>;  // Optional loading state while user data is being fetched
    }

    return (
        <div className="update-personal-info-container">
            <div className='update-information'>
            <form className="update-personal-info" onSubmit={handleUpdatePersonalInformation}>
                <h3>Update Personal Information</h3>
                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Enter your first name"
                />

                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Enter your last name"
                />

                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={emailAddress}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                />

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                />

                <button
                    type="submit"
                    className="btn-update-info"
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update Personal Information"}
                </button>
            </form>
            </div>
        </div>
    );
}

export default UpdatePersonalInformation;
