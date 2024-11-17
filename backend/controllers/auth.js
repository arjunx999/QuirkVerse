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
            followers,
            following,
        } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        // creating a new user in the database
        const newUser = new User ({
            username,
            name,
            email,
            password: passwordHash,
            picturePath,
            followers,
            following,
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;   
        const user = await User.findOne({ email: email })
        if(!user) {
            return res.status(400).json({ msg: "user does not exist" })
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ msg: "invalid credentials" })
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        delete user.password;
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}