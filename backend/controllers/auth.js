import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.js"

// sign up
export const register = async (req, res) => {
    try {
        // user details input
        const {
            username,
            name,
            email,
            password,
            picturePath,
            // followers,
            // following,
        } = req.body

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
        return res.status(400).json({ msg: "Username is already taken" });
        }
        // Check if a user already exists with the same email
        const existingMail = await User.findOne({ email });
        if (existingMail) {
        return res.status(409).json({ msg: "Email ID is already taken" });
        }
        const salt = await bcrypt.genSalt() // random data for encryption
        const passwordHash = await bcrypt.hash(password, salt)

        const finalPicturePath = picturePath || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png";
        // creating a new user in the database
        const newUser = new User ({
            username,
            name,
            email,
            password: passwordHash,
            picturePath: finalPicturePath,
            // followers,
            // following,
        })
        const savedUser = await newUser.save();
        // res.status(201).json(savedUser)
        res.status(201).json({
            success: true,
            message: "User successfully created",
            user: savedUser
          });          
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

// login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;   
        const user = await User.findOne({ email: email })
        if(!user) {
            return res.status(404).json({ msg: "user does not exist" })
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ msg: "invalid credentials" })
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // delete user.password;
        // res.status(200).json({ token, user })
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ 
            success: true,
            message: "Login successful",
            token, 
            user: userWithoutPassword 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message 
        });
    }
}