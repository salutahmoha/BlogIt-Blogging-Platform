import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiBase from '../../utils/apiBase';
import toast from 'react-simple-toasts';
import './css/ProfileUpdate.css';
import { useMutation, useQuery } from 'react-query';

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
        axios.get(`${apiBase}/profile`, { withCredentials: true })
            .then(response => {
                const profileData = response.data;
                setPhoneNumber(profileData.phoneNumber || "");
                setOccupation(profileData.occupation || "");
                setBio(profileData.bio || "");
                setSecondaryEmail(profileData.secondaryEmail || "");
                setProfileImage(profileData.profileImage || null);
                setProfileExists(true);  // Profile exists, so switch to update mode
            })
            .catch(err => console.log("No existing profile found or error fetching profile:", err));
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

    const {isLoading, mutate} = useMutation({
        mutationFn: async (profile) => {
            const method = profileExists ? 'PUT' : 'POST';  // Use PUT if updating, POST if creating
            const response = await fetch(`${apiBase}/profile`, {
                method,
                body: JSON.stringify(profile),
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
        onSuccess: (data) => {
            navigate("/Profile");
            toast(profileExists ? "Profile Updated" : "Profile Created", { theme: "toast-success", duration: 3000 });
            setProfileExists(true);  // Ensure we are in update mode after creation
        },

        onError: (error) => {
            console.log("Error during mutation:", error);  // Log mutation error
            toast(error.message, { theme: "toast-error", duration: 3000 });
        }
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!phoneNumber) {
            return toast("phoneNumber is required", { theme: "toast-error", duration: 3000 });
        }
        if (!occupation) {
            return toast("Occupation is required", { theme: "toast-error", duration: 3000 });
        }
        if (!bio) {
            return toast("Bio is required", { theme: "toast-error", duration: 3000 });
        }
        if (!secondaryEmail) {
            return toast("Secondary Email is required", { theme: "toast-error", duration: 3000 });
        }

        // Call mutation to create or update profile
        mutate({ phoneNumber, occupation, bio, secondaryEmail, profileImage });
    };

    return (
        <div className="profileupdate-container">
            <div className="profile-form">
            <form onSubmit={handleSubmit}>

                <label htmlFor="profileImage">Profile Image</label>
                <input
                    type="file"
                    id="profileImage"
                    onChange={handleFileUpload}
                />

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
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                ></textarea>

                <label htmlFor="secondaryEmail">Secondary Email</label>
                <input
                    type="email"
                    id="secondaryEmail"
                    value={secondaryEmail}
                    onChange={(e) => setSecondaryEmail(e.target.value)}
                    required
                />
                
                <button type="submit" className='btn-profle-update'>
                    {isLoading ? "Updating Profile..." : profileExists ? "Update Profile" : "Create Profile"}
                </button>
            </form>
            </div>
        </div>
    );
}

export default ProfileUpdate;
