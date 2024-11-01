import express from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const client = new PrismaClient();
app.post("/users", async(req, res) => {
    try{
        
        const { firstName, lastName, emailAddress, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = await client.user.create({
            data: {
                firstName,
                lastName,
                emailAddress,
                username,
                password: hashedPassword
            }
        })
        res.status(201).json(newUser)
    }catch(e){    
        res.status(500).json({message: "somethhing went wrong"})
    }
})

app.listen(4000, () => console.log("Server running...."))