import React from 'react';
import { useQuery } from 'react-query';
import PersonalBlogPreview from './PersonalBlogPreview';
import { Link } from 'react-router-dom';
import './css/PersonalBlogsPreview.css';
import apiBase from '../../utils/apiBase';
import { usePersonalBlogsStore } from '../../store/PersonalBlogsStore';

function PersonalBlogsPreview() {
    const blogs = usePersonalBlogsStore((state) => state.blogs);
    const setBlogs = usePersonalBlogsStore((state) => state.setBlogs);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['PersonalBlogs'],
        queryFn: async () => {
            const response = await fetch(`${apiBase}/blogs/user`, { credentials: "include" });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }
            return response.json();
        },
        onSuccess: (data) => {
            console.log("Data received:", data);
            setBlogs(data);
        },
    });

    if (isLoading) {
        return <h2>Loading, please wait...</h2>;
    }

    if (isError) {     
        return <h2>{error.message}</h2>;
    }

    return (
        <div className='personal-blogs'>
            <h2 className='personal-blog-title'>Your personal blogs</h2>

            <div className='create-personalblog'>
                <h3>You don't have any blogs yet? {' '}</h3>
                <Link to="/WritePage" className='create-blog'>Click to create one</Link>
            </div>

            <div className='personal-blog-list'>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((blog) => (
                        <PersonalBlogPreview 
                            key={blog.id}
                            id={blog.id}
                            title={blog.title}
                            excerpt={blog.excerpt}
                    
                        />
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>
        </div>
    );
}

export default PersonalBlogsPreview;
