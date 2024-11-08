
import React from 'react';
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
            email={blog.email}
            updatedAt={blog.updatedAt}
            title={blog.title}
            excerpt={blog.excerpt}
            body={blog.body}
            image={blog.image}
            id={blog.id}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogListings;
