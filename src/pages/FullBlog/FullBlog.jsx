import React from 'react';
import Navbar from '../BlogNavbar/navbar';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import apiBase from '../../utils/apiBase';
import './FullBlog.css';

function FullBlog() {
    const { id } = useParams();
    const location = useLocation();  // To access the passed state (profileImage)
    const { profileImage: passedProfileImage } = location.state || {};  // Get the profileImage from state

    // Fetch blog data and logged-in user data simultaneously
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            if (!id) {
                throw new Error('Blog ID is undefined');
            }

            const blogResponse = await fetch(`${apiBase}/blogs/${id}`, { credentials: "include" });
            if (!blogResponse.ok) {
                const error = await blogResponse.json();
                throw new Error(error.message);
            }
            const blogData = await blogResponse.json();

            // Fetch logged-in user profile
            const userResponse = await fetch(`${apiBase}/users/profile`, { credentials: "include" });
            if (!userResponse.ok) {
                const error = await userResponse.json();
                throw new Error(error.message);
            }
            const userData = await userResponse.json();

            return { blogData, userData }; // Combine both the blog and user data
        },
    });

    // Format the date in the desired format
    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return new Date(date).toLocaleString('en-US', options);
    };

    if (isLoading) {
        return <h2>Loading, please wait...</h2>;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }

    return (
        <div>
            <Navbar />
            <div className="full-blog">
                <div className="full-header">
                    <div className="author">
                        <p>Author: {data.blogData.user.firstName} {data.blogData.user.lastName}</p>
                        <p>Email: {data.blogData.user.emailAddress}</p>
                        <p>Last Updated: {formatDate(data.blogData.updatedAt)}</p>
                        <p>Created At: {formatDate(data.blogData.createdAt)}</p>
                    </div>
                    <div className="image">
                        {/* Display the logged-in user's profile image */}
                        <img 
                            src={passedProfileImage || data.userData.profileImage || "default-profile-image.jpg"} 
                            alt="Author" 
                            style={{ width: "100px", height: "100px" }} 
                        />
                    </div>
                </div>
                <h2 className="full-title">{data.blogData.title}</h2>
                <div className="blog-img"><img src={data.blogData.image} alt="Blog" /></div>
                <p className="full-excerpt">{data.blogData.excerpt}</p>
                <p className="full-body" dangerouslySetInnerHTML={{ __html: data.blogData.body }}></p>
            </div>
        </div>
    );
}

export default FullBlog;
