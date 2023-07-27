const StudentModel = require('../models/StudentModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Course = require("../models/CourseModel");
const jwt = require('jsonwebtoken');
const Student = require("../models/StudentModel");
const {httpOnly, data} = require("express-session/session/cookie");
const expressAsyncHandler = require("express-async-handler");
const TokenGenerator=require("../utils/TokenGenerator").modules.TokenGenerator;

// Add new student
const AddNewStudent = async (req, res) => {

    try {
        const formData = req.body;
        if (!formData.name || !formData.email || !formData.password || !formData.city || !formData.level) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Check if the email is already present in the database
        const existingStudent = await StudentModel.findOne({ email: formData.email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already exists' });
        }


        // Generating hash password
        const saltRounds = 10; // Number of salt rounds to use

        bcrypt.hash(formData.password, saltRounds, async function (err, hash) {
            if (err) {
                // Handle error
                console.log("error generating hash for the user", formData.email);
            } else {
                // Store the hash in the database or use it as needed
                console.log('Hashed Password:', hash);
                formData.password = hash;
                const newRecord = new StudentModel(formData);
                await newRecord.save();
                res.status(200).json({ message: 'Form data saved successfully', formData });
            }
        });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Error saving form data' });
    }
};

// Login
const Login = async (req, res) => {
    try {
        const formData = req.body;
        if (!formData.email || !formData.password) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Check if the email is not present in the database
        const existingStudent = await StudentModel.findOne({ email: formData.email });
        if (!existingStudent) {
            return res.status(400).json({ message: 'Email not exists' });
        }

        // COMPARING THE HASHES OF THE TWO PASSWORDS
        bcrypt.compare(formData.password, existingStudent.password, async function (err, result) {
            if (err) {
                console.log('error login')
                // Handle error
            } else if (result === true) {
                const userId=existingStudent._id;
                const token = jwt.sign({ userId }, process.env.JWT_PASS, { expiresIn: '30d' });

                res.status(202).json({
                    token: token,
                    level: existingStudent.level,
                    name: existingStudent.name,
                    email: existingStudent.email
                });

                // Passwords match, login successful
                console.log('Login successful');// Generate JWT or start user session
            } else {
                // Passwords do not match, login failed
                console.log('Login failed');
                return res.status(400).json({message: 'password is wrong'});

            }
        });




    } catch (error) {
        console.error('Error retrieving student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getStudent = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ error: 'Email parameter is required' });
        }

        const student = await StudentModel.findOne({ email });

        if (!student) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error retrieving student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getAllStudents= async (req,res)=>{
    const Students =await StudentModel.find({})
    res.status(200).json(Students)
}

const getInfos = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract the JWT token from the Authorization header
        jwt.verify(token, process.env.JWT_PASS, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: 'Token expired' });
                }

                console.log('Error:', err);
            }
            req.userId = decoded.userId;
        });

        const userId = req.userId;
        console.log(userId);

        const infosUser = await Student.findById(userId).select('name email level');
        res.status(200).json({
            level: infosUser.level,
            name: infosUser.name,
            email: infosUser.email
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// LOGOUT :
const logoutStudent = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).send('Logged Out successfully');
    } catch (e) {
        console.log('error logging out:', e);
        res.status(500).send('error logging out');
    }
};



module.exports = { AddNewStudent , getStudent, getAllStudents, Login, getInfos, logoutStudent };

