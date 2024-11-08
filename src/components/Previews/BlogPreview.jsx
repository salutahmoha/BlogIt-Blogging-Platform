
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './css/BlogPreview.css';

// function BlogPreview({ id, title, excerpt, body, author, image }) {
//   const navigate = useNavigate();

// /*************  ✨ Codeium Command ⭐  *************/
// /******  0a8b32f9-dc91-46da-8b42-dd1147c95370  *******/
//   function handleReadMore() {
//     if (!id) return;
//     navigate(`/blogs/${id}`);
//   }

//   return (
//     <div className="blog-preview">
//       <div className="blog">
//         <h2 className="title">{title}</h2>
//         <p className="excerpt">{excerpt}</p>
//         <p className="body" dangerouslySetInnerHTML={{ __html: body }}></p>
//         <div className="blog-footer">
//           <div className='author-details'>
//             <p className='blog-image'><img src={image} /></p>
//             <p className="author">By {author}</p>
//           </div>
//           <button className="btn-readmore" onClick={handleReadMore}>Read more</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogPreview;
