import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createBlog(req, res) {
    try {
        const { title, excerpt, body, image } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!excerpt) {
            return res.status(400).json({ message: "Excerpt is required" });
        }
        if (!body) {
            return res.status(400).json({ message: "Body is required" });
        }

        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Use a default avatar if no image is provided
        const imageUrl = image || 'https://example.com/default-avatar.png';

        const newBlog = await prisma.blog.create({
            data: {
                title,
                excerpt,
                body,
                image: imageUrl,
                owner: userId,
            }
        });

        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
}



export async function fetchingSingleBlog(req, res) {
    try {
        const { id } = req.params;

        const blog = await prisma.blog.findFirst({
            where: {
                id
            },
            include: {
                user: true 
            }
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (e) {
        console.error("Error fetching blog:", e);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export async function fetchingAllBlogs(req, res) {
    try{
        const blogs = await prisma.blog.findMany({
            include: {
                user: true 
            }
        });
        res.status(200).json(blogs);
    }catch(e){
        res.status(500).json({ message: "Something went wrong" });
    }
}

export async function getUserBlogs(req, res){
    try{
        const userId = req.userId;
        const userBlogs = await prisma.blog.findMany({
            where: {
                owner: userId
            },
            include: {
                user: true 
            }
        });
        res.status(200).json(userBlogs);
    }catch(e){
        res.status(400).json({ message: "Something went wrong please try again"})
    }
}

// delete blog

export async function deleteBlog(req, res) {
    try {
        const {blogId} = req.params;
        const userId = req.userId;

        await prisma.blog.delete({
            where: {
                id: blogId,
                owner: userId
            }
        })
        res.status(200).json({message: "Blog deleted successfully"});
    }catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// update blog
export async function updateBlog(req, res) {
    try {
        const { blogId } = req.params;
        const { title, excerpt, body } = req.body;
        const userId = req.userId;
        const blog = await prisma.blog.update({
            where: {
                id: blogId,
                owner: userId
            },
            data: {
                title,
                excerpt,
                body
            }
        })
        res.status(200).json(blog);
    }catch (e) {
      res.status(500).json({ message: "Something went wrong" });  
    }                                                                                                                                               
}

// update personal information
export async function updatePersonalInformation(req, res) {
    try {
        const { firstName, lastName, emailAddress, username } = req.body;
        const userId = req.userId;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                emailAddress,
                username
            }
        });

        res.status(200).json(user);
    } catch (e) {
        console.error("Error updating user information:", e.message, e.stack);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// create profile
export async function createProfile(req, res) {
    try {
        const { phoneNumber, occupation, bio, secondaryEmail, profileImage } = req.body;

        // Validate required fields
        if (!phoneNumber) return res.status(400).json({ message: "phoneNumber is required" });
        if (!occupation) return res.status(400).json({ message: "occupation is required" });
        if (!bio) return res.status(400).json({ message: "Bio is required" });
        if (!secondaryEmail) return res.status(400).json({ message: "secondaryEmail is required" });

        // Check if the user is authenticated
        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: "User not authenticated" });

        // Ensure the secondaryEmail is unique across all profiles
        const existingProfileWithSecondaryEmail = await prisma.profile.findUnique({
            where: { secondaryEmail },
        });
        if (existingProfileWithSecondaryEmail) {
            return res.status(409).json({ message: "Secondary email has already been taken" });
        }

        // Use a default avatar if no image is provided
        const imageUrl = profileImage || 'https://example.com/default-avatar.png';

        // Create a new profile in the database
        const newProfile = await prisma.profile.create({
            data: {
                phoneNumber,
                occupation,
                bio,
                secondaryEmail,
                profileImage: imageUrl,
                user: {
                    connect: { id: userId }  // Ensure this connects the profile to the authenticated user
                }
            },
        });

        res.status(201).json(newProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// Getting profile for  logged in user
export  async function  getUserProfie(req, res) {
    try {
        const userId = req.userId;  // Assuming verifyToken sets req.userId

        // Fetch profile based on the authenticated user's ID
        const profile = await prisma.profile.findUnique({
            where: { userId },
        });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "An error occurred while fetching the profile." });
    }
};

// update profile
export async function updateProfile(req, res) {
    try {
        const { phoneNumber, occupation, bio, secondaryEmail, profileImage } = req.body;
        const userId = req.userId;

        // Check if profile exists
        const existingProfile = await prisma.profile.findUnique({ where: { userId } });
        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found. Please create a profile first." });
        }

        // Update profile with new data
        const updatedProfile = await prisma.profile.update({
            where: { userId },
            data: {
                phoneNumber,
                occupation,
                bio,
                secondaryEmail,
                profileImage,
            },
        });

        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "An error occurred while updating the profile." });
    }
};