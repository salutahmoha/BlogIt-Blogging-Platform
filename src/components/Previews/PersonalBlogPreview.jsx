import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import apiBase from '../../utils/apiBase';
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";
import './css/PersonalBlogPreview.css';	
function PersonalBlogPreview({ id, title, excerpt }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {isLoading, refetch} = useQuery({
        queryKey: ['PersonalBlog', id],
        queryFn: async () => {
            const response = await fetch(`${apiBase}/blogs/${id}`, { 
                method: 'DELETE',
                credentials: "include" });
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
            }
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            toast("Blog deleted successfully", { theme: "toast-success", duration: 2000 });
            queryClient.invalidateQueries('PersonalBlogs');
        },

        onError: (error) => {
            toast(error.message, { theme: "toast-error", duration: 2000 });

        },
        enabled: false
    })

    function handleRedirectEdit() {
        navigate(`/EditBlog/${id}`);
    }

    return (
        <div className='personal-blog-container'>
          <div className='personal-blog-preview'>
            <div className='blog-preview-title'><h2>{title}</h2></div>
            <div className='blog-preview-excerpt'><p>{excerpt}</p></div>
            
            <div className='personal-blog-footer'>
                <button className='update' onClick={handleRedirectEdit}>Update</button>
                <button className='delete' disabled={isLoading} onClick={() => refetch()}>
                    {isLoading ? "Please wait..." : "Delete"}
                </button>
            </div>
           </div>
        </div>
    );
}

export default PersonalBlogPreview;
