import React, { useState } from 'react';
import { useMutation } from 'react-query';
import apiBase from '../../utils/apiBase';
import toast from 'react-simple-toasts';
import "react-simple-toasts/dist/style.css";
import useUserStore from '../../store/useStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './css/UpdatePassword.css';

function UpdatePassword() {
    const [prevPassword, setPrevPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPrevPassword, setShowPrevPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const setUser = useUserStore(state => state.setUser);

    const { mutate, isLoading } = useMutation({
        mutationFn: async (passwords) => {
            const response = await fetch(`${apiBase}/auth/password`, {
                method: 'PATCH',
                body: JSON.stringify(passwords),
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            toast("Password updated successfully", { theme: "toast-success", duration: 3000 });
            setUser(null);
        },
        onError: (error) => {
            toast(error.message, { theme: "toast-error", duration: 3000 });
        }
    });

    function handleUpdatePassword(e) {
        e.preventDefault();
        if (!prevPassword) {
            return toast("Previous password required", { theme: "toast-error", duration: 3000 });
        }
        if (!newPassword) {
            return toast("New password required", { theme: "toast-error", duration: 3000 });
        }
        if (!confirmPassword) {
            return toast("Confirm password required", { theme: "toast-error", duration: 3000 });
        }
        if (newPassword !== confirmPassword) {
            return toast("New password and confirm password do not match", { theme: "toast-error", duration: 3000 });
        }
        mutate({ prevPassword, newPassword });
    }

    return (
        <div className='update-password-container'>
            <form className='update-password-form'>
                <h3>Update Your Password</h3>
                <div className='update-password'>
                    <label htmlFor="previous-password">Previous Password</label>
                    <div className='password-field'>
                        <input
                            type={showPrevPassword ? "text" : "password"}
                            name='previous-password'
                            id='previous-password'
                            placeholder='Enter your previous password'
                            value={prevPassword}
                            onChange={(e) => setPrevPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={showPrevPassword ? faEyeSlash : faEye}
                            onClick={() => setShowPrevPassword(!showPrevPassword)}
                            className="eye-icon"
                        />
                    </div>

                    <label htmlFor="new-password">New Password</label>
                    <div className='password-field'>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            name='new-password'
                            id='new-password'
                            placeholder='Enter your new password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={showNewPassword ? faEyeSlash : faEye}
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="eye-icon"
                        />
                    </div>

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <div className='password-field'>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirm-password'
                            id='confirm-password'
                            placeholder='Confirm your new password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="eye-icon"
                        />
                    </div>

                    <button type='submit' className='btn-update-password' disabled={isLoading} onClick={handleUpdatePassword}>
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePassword;
