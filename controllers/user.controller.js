import bcrypt from "bcrypt"
import { User } from "../models/user.model";
import { inngest } from "../inngest/client";
import jwt from "jsonwebtoken"
import { json } from "express";

const signup = async(req, res) => {
    const { email, password, skills = []} = req.body

    try {
        const hashedPassword = bcrypt.hash(password,10);
        const user = await User.create({
            email,
            hashedPassword,
            skills
        })

        await inngest.send({
            name: "user/signup", 
            data: {
                email,
            }
        })

        const token = jwt.sign({
            _id: user._id,
            role: user.role
        },
            process.env.JWT_SECRET
        )

        res.json({user, token})
    } catch (error) {
        res.status(500).json("error while signing up the user",error.message)
    }
}

const login = async(req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({error:"User not found"})
            
            const isMatched = await bcrypt.compare(password, user.password)

            if(!isMatched){
                return res.status(400).json({error:"Invalid credentils"})
            }
        }

        const token = jwt.sign({
            _id: user._id,
            role: user.role
        },
            process.env.JWT_SECRET
        )

        res.json({user, token})
    } catch (error) {
        res.status(500).json("error while login up the user",error.message)
        
    }


}

const logout = async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(400).json({error:"Unauthorized"})
        }

        jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
            if(err){
                return res.status(400),json({error:"Unauthorized"})
            }
            res.status(200).json({message:"Logout Successfully"})
        })


    } catch (error) {
        res.status(500).json("error while loginout the user",error.message)
        
    }
}

const updateUser = async(req, res) => {
    const { email, skills = [], role } = req.body

    try {
        if(req.user.role !== "admin"){
            return res.status(400).json({error:"Forbidden"})
        }

        const user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({error:"user not found"})
        }

        await User.updateOne(
            { email },
            {
                skills : skills.length ? skills : user.skills,
                role,
            }
        )

        res.ststus(200).json({message:"User Updated Successfully"})

    } catch (error) {
        res.status(500).json("error while updating the user",error.message)
        
    }
}

const getUser  = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(400).json({error:"Forbidden"})
        }
    
        const users = await User.find().select("-password")
    
        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json("error while fetching the user",error.message)
        
    }
}