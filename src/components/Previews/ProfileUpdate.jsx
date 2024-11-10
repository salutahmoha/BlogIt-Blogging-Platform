import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiBase from '../../utils/apiBase';
import toast from 'react-simple-toasts';
import './css/ProfileUpdate.css';
import { useMutation } from 'react-query';

function ProfileUpdate() {
    const [profileExists, setProfileExists] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [occupation, setOccupation] = useState("");
    const [bio, setBio] = useState("");
    const [secondaryEmail, setSecondaryEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    const cloud_name = "dabf2zb53";
    const preset_key = "uuru49ye";

    // Fetch profile data on load to prefill form if profile exists
    useEffect(() => {
        axios.get(`${apiBase}/users/profile`, { withCredentials: true })
            .then(response => {
                const profileData = response.data;
                setPhoneNumber(profileData.phoneNumber);
                setOccupation(profileData.occupation);
                setBio(profileData.bio);
                setSecondaryEmail(profileData.secondaryEmail);
                setProfileImage(profileData.profileImage);
                setProfileExists(true);
            })
            .catch(err => {
                console.log("No existing profile found or error fetching profile:", err);
                setProfileExists(false);
            });
    }, []);

    // Handle file upload to Cloudinary
    function handleFileUpload(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_key);
        
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then(res => setProfileImage(res.data.secure_url))
            .catch(err => console.error("Image upload failed", err));
    }

    const { isLoading, mutate } = useMutation({
        mutationFn: async (profile) => {
            const response = await fetch(`${apiBase}/users/profile`, {
                method: 'POST',
                body: JSON.stringify(profile),
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return await response.json();
        },
        onSuccess: () => {
            // Clear the form fields after successful profile creation
            setPhoneNumber('');
            setOccupation('');
            setBio('');
            setSecondaryEmail('');
            setProfileImage(null);

            // Switch to update mode
            setProfileExists(true);

            toast("Profile Created", { theme: "toast-success", duration: 3000 });
        },
        onError: (error) => {
            console.log("Error during mutation:", error);
            toast(error.message, { theme: "toast-error", duration: 3000 });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!phoneNumber && !occupation && !bio && !secondaryEmail && !profileImage) {
            return toast("At least one field is required", { theme: "toast-error", duration: 3000 });
        }
    
        const updatedProfile = {};
    
        if (phoneNumber !== "") updatedProfile.phoneNumber = phoneNumber;
        if (occupation !== "") updatedProfile.occupation = occupation;
        if (bio !== "") updatedProfile.bio = bio;
        
        if (secondaryEmail !== "") {
            updatedProfile.secondaryEmail = secondaryEmail;
        }
    
        if (profileImage !== null) updatedProfile.profileImage = profileImage;
    
        mutate(updatedProfile);
    };
    
    return (
        <div className="profileupdate-container">
            <div className="profile-form">
                <form onSubmit={handleSubmit}>
                    <h3>{profileExists ? "Update Profile" : "Create Profile"}</h3>
                    {profileExists ? (
                        <>
                            {/* Show the existing image */}
                            <img
                                src={profileImage || "default-profile-image.jpg"}
                                alt="Profile"
                                className="profile-image"
                                style={{ width: '10rem', cursor: 'pointer' }}
                                onClick={() => document.getElementById('fileUpload').click()}
                            />
                            {/* Hidden file input */}
                            <input
                                type="file"
                                id="fileUpload"
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                        </>
                    ) : (
                        <>
                            {/* Show file input if no profile exists */}
                            <label htmlFor="profileImage">Profile Image</label>
                            <input
                                type="file"
                                id="profileImage"
                                onChange={handleFileUpload}
                            />
                        </>
                    )}

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />

                    <label htmlFor="occupation">Occupation</label>
                    <input
                        type="text"
                        id="occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        required
                    />

                    <label htmlFor="bio">Bio</label>
                    <input
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        required
                    />

                    <label htmlFor="secondaryEmail">Secondary Email</label>
                    <input
                        type="email"
                        id="secondaryEmail"
                        value={secondaryEmail}
                        onChange={(e) => setSecondaryEmail(e.target.value)}
                        required
                    />

                    <button type="submit" className='btn-profile-update'>
                        {isLoading ? "Updating Profile..." : profileExists ? "Update Profile" : "Create Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProfileUpdate;
