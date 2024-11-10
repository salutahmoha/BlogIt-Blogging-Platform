import React from 'react';
import Navbar from '../BlogNavbar/navbar';
import PersonalBlogsPreview from '../../components/Previews/PersonalBlogsPreview';
import PersonalBlogPreview from '../../components/Previews/PersonalBlogPreview';
import './BlogPage.css';

function BlogPage() {
    return (
        <div>
            <Navbar />
            <PersonalBlogsPreview />
        </div>
    );
}

export default BlogPage;
