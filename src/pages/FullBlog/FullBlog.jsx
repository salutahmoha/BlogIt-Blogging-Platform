import React from 'react';
import Navbar from '../BlogNavbar/navbar';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import apiBase from '../../utils/apiBase';
import './FullBlog.css';

function FullBlog() {
    const { id } = useParams();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            if (!id) {
                throw new Error('Blog ID is undefined');
            }

            const response = await fetch(`${apiBase}/blogs/${id}`, { credentials: "include" }); // Fetching using dynamic ID
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return await response.json();
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
                        <p>Author: {data.user.firstName} {data.user.lastName}</p>
                        <p>Email: {data.user.emailAddress}</p>
                        <p>Last Updated: {formatDate(data.updatedAt)}</p>
                        <p>Created At: {formatDate(data.createdAt)}</p>
                    </div>
                    <div className="image">
                        <img src={data.image}/>
                    </div>
                </div>
                <h2 className="full-title">{data.title}</h2>
                <div className="blog-img"><img src={data.image} alt="Blog" /></div>
                <p className="full-excerpt">{data.excerpt}</p>
                <p className="full-body" dangerouslySetInnerHTML={{ __html: data.body }}></p>
            </div>
        </div>
    );
}

export default FullBlog;
