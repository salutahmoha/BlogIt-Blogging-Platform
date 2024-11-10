import React, { useEffect, useState } from 'react';
import Navbar from '../BlogNavbar/navbar';
import { useQuery } from 'react-query';
import apiBase from '../../utils/apiBase';
import BlogPreview from '../../components/Previews/BlogPreview';

function BlogListings() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs`, { credentials: "include" });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    }
  });

  const [profileImage, setProfileImage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch the logged-in user's profile image and user ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiBase}/users/profile`, { credentials: "include" });
        if (response.ok) {
          const user = await response.json();
          setCurrentUserId(user.id); // Store the current logged-in user's ID
          setProfileImage(user.profileImage || "default-profile-image.jpg"); // Set profile image
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <Navbar />
      <div className="blog-container">
        {data.map((blog, i) => (
          <BlogPreview 
            key={i}
            author={`${blog.user.firstName} ${blog.user.lastName}`}
            authorId={blog.user.id} // Pass the author's ID to BlogPreview
            title={blog.title}
            excerpt={blog.excerpt}
            body={blog.body}
            image={blog.image}
            id={blog.id}
            profileImage={currentUserId === blog.user.id ? profileImage : blog.image} // Conditionally pass the profile image or blog image
          />
        ))}
      </div>
    </div>
  );
}

export default BlogListings;
