import React, { useState } from 'react';
import Navbar from '../BlogNavbar/navbar';
import axios from 'axios';	
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiBase from '../../utils/apiBase';
import toast from 'react-simple-toasts';
import "react-simple-toasts/dist/style.css";
import './WritePage.css';

function WritePage() {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [body, setBody] = useState(""); 
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const cloud_name = "dabf2zb53";
    const preset_key = "uuru49ye";

    // Handle file upload to Cloudinary
    function handleFileUpload(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_key);
        
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then(res => setImage(res.data.secure_url))
            .catch(err => console.error("Image upload failed", err));
    }

    // Define the mutation function for posting blog
    const { mutate, isLoading } = useMutation({
        mutationFn: async function (Blog) {
            // console.log("Sending data: ", Blog); // Log the data being sent
            const response = await fetch(`${apiBase}/blogs`, {
                method: 'POST',
                body: JSON.stringify(Blog),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', 
                },
                credentials: "include"
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Something went wrong");
            }
            
            const data = await response.json();
            return data;
        },
        onSuccess: (data) => {
            console.log("Blog created successfully: ", data);  // Log the successful creation
            navigate(`/blogs/${data.id}`);
            toast("Blog Created", { theme: "toast-success", duration: 3000 });
            setTitle("");
            setImage("");
            setExcerpt("");
            setBody("");
        },
        onError: (error) => {
            console.log("Error during mutation:", error);  // Log mutation error
            toast(error.message, { theme: "toast-error", duration: 3000 });
        }
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title) {
            return toast("Title is required", { theme: "toast-error", duration: 3000 });
        }
        if (!excerpt) {
            return toast("Excerpt is required", { theme: "toast-error", duration: 3000 });
        }
        if (!body) {
            return toast("Body is required", { theme: "toast-error", duration: 3000 });
        }
        if (!image) {
            return toast("Image is required", { theme: "toast-error", duration: 3000 });
        }

        // Call mutation to create blog
        mutate({ title, excerpt, body, image });
    };

    // Function to count words
    const countWords = (text) => {
        if (typeof text !== 'string') return 0;
        return text.trim().split(/\s+/).filter(word => word).length;
    };

    // Define Quill editor modules
    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'align': [] }],
            ['link'],
            ['clean'],
            ['undo', 'redo']
        ]
    };

    return (
        <div>
            <Navbar />
            <div className="write-blog">
                <div className="write">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        className="title-input" 
                        placeholder='Enter your title' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required
                    />
                    <p>{countWords(title)}/50 words</p>

                    <label htmlFor="image">Upload Image</label>
                    <input
                     type="file" 
                     className='image-input'
                     id='image'
                     onChange={handleFileUpload}
                    />

                    <label htmlFor="excerpt">Excerpt</label>
                    <textarea 
                        rows={3} 
                        className="excerpt" 
                        placeholder='Enter your excerpt' 
                        value={excerpt} 
                        onChange={(e) => setExcerpt(e.target.value)} 
                        required
                    ></textarea>
                    <p>{countWords(excerpt)}/200 words</p>

                    <label htmlFor="body">Body</label>
                    <ReactQuill 
                        value={body} 
                        onChange={setBody} 
                        modules={modules} 
                        className="body-editor"
                        placeholder='Write your story here...'
                    />
                    <p>{countWords(body)}/1000 words</p>

                    <button 
                        type='submit' 
                        className='btn-write' 
                        onClick={handleSubmit} 
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WritePage;
