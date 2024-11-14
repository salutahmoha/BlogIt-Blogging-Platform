// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';

// const client = new PrismaClient();

// export async function loginUser(req, res) {
//     try {
//         const identifier = req.body.identifier;
//         const password = req.body.password;

//         const user = await client.user.findFirst({
//             where: {
//                 OR: [
//                     { emailAddress: identifier },
//                     { username: identifier }
//                 ]
//             }
//         });

//         if (!user) {
//             return res.status(401).json("Wrong email/username or password");
//         }

//         const passwordsMatch = await bcrypt.compare(password, user.password);
//         if (!passwordsMatch) {
//             return res.status(401).json("Wrong email/username or password");
//         }

//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200)
//             .cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
//             .json(user);
//     } catch (e) {
//         // console.error("Login error:", e);
//         res.status(500).json("Something went wrong");
//     }
// }

// export async function logoutUser(req, res) {
//     try {
//         res.clearCookie("authToken", { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
//         res.status(200).json({ message: "Logout successful" });
//     } catch (error) {
//         res.status(500).json("Something went wrong during logout");
//     }
// }



// // update password
// export async function updatePassword(req, res){
//     try {
//         const userId = req.userId;
//         const prevPassword = req.body.prevPassword;
//         const newPassword = req.body.newPassword;

//         const user = await client.user.findFirst({
//             where: {
//                 id: userId
//             }
//         })	
//         if(!user){
//             return res.status(404).json({ message: "User not found" });
//         }

//         const theyMatch = await bcrypt.compare(prevPassword, user.password);
//         if(theyMatch){
//             const hashedPassword = await bcrypt.hash(newPassword, 8);
//             await client.user.update({
//                 where: {
//                     id: userId
//                 },
//                 data: {
//                     password: hashedPassword
//                 }
//             })
//             res.status(200).json({ message: "Password updated successfully" });
//             return 
//         }
//         res.status(400).json({ message: "Previous password is incorrect" });
//     }catch{
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }