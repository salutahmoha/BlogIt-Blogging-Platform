import express from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { loginUser, updatePassword , logoutUser} from './controllers/auth.controllers.js';
import { createBlog, fetchingSingleBlog, fetchingAllBlogs, getUserBlogs, deleteBlog, updateBlog, updatePersonalInformation, createProfile, getUserProfie, updateProfile, fetchProfileImage } from './controllers/blogs.controllers.js';
import verifyToken  from './middleware/verifyToken.js';
import cookierParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import validateBlog from './middleware/validateBlog.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookierParser());
const client = new PrismaClient();
app.post("/users", async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, username, password } = req.body;

        const UserWithEmail = await client.user.findFirst({
            where: { emailAddress: emailAddress }
        });
        if (UserWithEmail) {
            return res.status(400).json("Email has already been taken" );
        }
        const UserWithUsername = await client.user.findFirst({
            where: { username: username }
        });
        if (UserWithUsername) {
            return res.status(400).json("Username has already been taken" );
        }
        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = await client.user.create({
            data: {
                firstName,
                lastName,
                emailAddress,
                username,
                password: hashedPassword
            }
        });
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json( "Something went wrong" );
    }
});

// update profile


app.post("/auth/login", loginUser);
// logout
app.post("/user/logout", logoutUser);
app.post("/users/profile", verifyToken, createProfile);
app.get("/users/profile", verifyToken, getUserProfie);
app.put("/users/profile", verifyToken, updateProfile);
app.put("/users", verifyToken, updatePersonalInformation);
app.patch("/auth/password", verifyToken, updatePassword);
app.post("/blogs", verifyToken, validateBlog, createBlog);
app.get("/blogs/user", verifyToken, getUserBlogs);
app.get("/blogs/:id", verifyToken, fetchingSingleBlog);
app.get("/blogs", verifyToken, fetchingAllBlogs);
app.delete("/blogs/:blogId", verifyToken, deleteBlog);
app.put("/blogs/:blogId", verifyToken, validateBlog, updateBlog);

// fetch profile image
app.get("/users/:userId/profile", fetchProfileImage);

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
