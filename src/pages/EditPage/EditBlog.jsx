// import React, { useState } from 'react';
// import Navbar from '../BlogNavbar/navbar';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useQuery, useMutation } from 'react-query';
// import apiBase from '../../utils/apiBase';
// import toast from 'react-simple-toasts';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "react-simple-toasts/dist/style.css";

// function EditBlog() {
//     const [title, setTitle] = useState("");
//     const [excerpt, setExcerpt] = useState("");
//     const [body, setBody] = useState(""); 

//     const navigate = useNavigate();
//     const { blogId } = useParams();

//     // Fetch blog data to prefill form
//     const {isLoading} = useQuery({
//         queryKey: ['blog', blogId],
//         queryFn: async () => {
//             const response = await fetch(`${apiBase}/blogs/${blogId}`, { credentials: "include" });
//             if (!response.ok) {
//                 const error = await response.json();
//                 throw new Error(error.message);
//             }
//             return response.json();
//         },
//         onSuccess: (data) => {
//             setTitle(data.title);
//             setExcerpt(data.excerpt);
//             setBody(data.body);
//         },
//     });

//     // Mutation to update the blog
//     const { mutate, isLoading: isUpdating } = useMutation({
//         mutationFn: async (updatedBlog) => {
//             const response = await fetch(`${apiBase}/blogs/${blogId}`, {
//                 method: 'PUT',
//                 body: JSON.stringify(updatedBlog),
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: "include",
//             });
//             if (!response.ok) {
//                 const error = await response.json();
//                 throw new Error(error.message);
//             }
//             return response.json();
//         },
//         onSuccess: () => {
//             toast("Blog updated successfully", { theme: "toast-success", duration: 2000 });
//             navigate(`/blogs/${blogId}`);
//         },
//         onError: (error) => {
//             toast(error.message, { theme: "toast-error", duration: 2000 });
//         },
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!title || !excerpt || !body) {
//             return toast("Please fill in all required fields", { theme: "toast-error", duration: 3000 });
//         }
//         mutate({ title, excerpt, body });
//     };

//     const countWords = (text) => {
//         if (typeof text !== 'string') return 0;
//         return text.trim().split(/\s+/).filter(word => word).length;
//     };

//     const modules = {
//       toolbar: [
//           [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
//           [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//           ['bold', 'italic', 'underline', 'strike'],
//           [{ 'color': [] }, { 'background': [] }],
//           [{ 'script': 'sub'}, { 'script': 'super' }],
//           [{ 'align': [] }],
//           ['link'],
//           ['clean'],
//           ['undo', 'redo']
//       ]
//   };

//     return (
//         <div>
//             <Navbar />
//             <div className="write-blog">
//                 <div className="write">
//                     <label htmlFor="title">Title</label>
//                     <input 
//                         type="text" 
//                         className="title" 
//                         placeholder='Enter your title' 
//                         value={title} 
//                         onChange={(e) => setTitle(e.target.value)} 
//                         required
//                     />
//                     <p>{countWords(title)}/50 words</p>

//                     <label htmlFor="excerpt">Excerpt</label>
//                     <textarea 
//                         rows={3} 
//                         className="excerpt" 
//                         placeholder='Enter your excerpt' 
//                         value={excerpt} 
//                         onChange={(e) => setExcerpt(e.target.value)} 
//                         required
//                     ></textarea>
//                     <p>{countWords(excerpt)}/200 words</p>

//                     <label htmlFor="body">Body</label>
//                     <ReactQuill 
//                         value={body} 
//                         onChange={setBody} 
//                         modules={modules} 
//                         className="body-editor"
//                     />
//                     <p>{countWords(body)}/1000 words</p>

//                     <button 
//                         type='submit' 
//                         className='btn-write' 
//                         onClick={handleSubmit} 
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Loading..." : "Submit"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EditBlog;
