import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/BlogPreview.css';
import apiBase from '../../utils/apiBase';

function BlogPreview({ id, title, excerpt, body, author, image, authorId }) {
  const [profileImage, setProfileImage] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {

        const response = await fetch(`${apiBase}/users/profile`, { credentials: "include" });
        if (response.ok) {
          const user = await response.json();
          setProfileImage(user.profileImage || "default-profile-image.jpg");
        }
      } catch (error) {
        console.error('Error fetching author profile:', error);
      }
    };

    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  function handleReadMore() {
    if (!id) return;

  
    navigate(`/blogs/${id}`, { state: { profileImage } });
  }

  return (
    <div className="blog-preview">
      <div className="blog">
        <h2 className="title">{title}</h2>
        <p className="excerpt">{excerpt}</p>
        <p className="body" dangerouslySetInnerHTML={{ __html: body }}></p>
        <div className="blog-footer">
          <div className='author-details'>
            {/* Display the author's profile image */}
            <p className='blog-image'>
              <img src={profileImage} alt="Author" />
            </p>
            <p className="author">By {author}</p>
          </div>
          <button className="btn-readmore" onClick={handleReadMore}>Read more</button>
        </div>
      </div>
    </div>
  );
}

export default BlogPreview;
