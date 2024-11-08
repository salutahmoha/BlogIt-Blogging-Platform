// import React from 'react';
// import Navbar from '../BlogNavbar/navbar';
// import { useParams } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import apiBase from '../../utils/apiBase';
// import './FullBlog.css';

// function FullBlog() {
//     const { id } = useParams();

//     const { isLoading, isError, error, data } = useQuery({
//         queryKey: ['blog', id],
//         queryFn: async () => {
//             if (!id) {
//                 throw new Error('Blog ID is undefined');
//             }
            
//             const response = await fetch(`${apiBase}/blogs/${id}`, { credentials: "include" }); // Fetching using dynamic ID
//             if (!response.ok) {
//                 const error = await response.json();
//                 throw new Error(error.message);
//             }
//             return await response.json();
//         },
//         queryKey: ['blog', id],
//     });
    

//     if (isLoading) {
//         return <h2>Loading, please wait...</h2>;
//     }

//     if (isError) {
//         return <h2>{error.message}</h2>;
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className="full-blog">
//                 <div className='full-header'>
//                 <div className='author'>
//                 <p>Author: {data.user.firstName} {data.user.lastName}</p>
//                 <p>Email: {data.user.emailAddress}</p>
//                 <p>Last Updated: {new Date(data.updatedAt).toLocaleDateString()}</p>
//                 </div>
//                 <div className='image'><img src={data.image} /></div>
//                 </div>
//                 <h2 className='full-title'>{data.title}</h2>
//                 <p className='full-excerpt'>{data.excerpt}</p>
//                 <p className='full-body' dangerouslySetInnerHTML={{ __html: data.body }}></p>
//             </div>
//         </div>
//     );
// }

// export default FullBlog;
