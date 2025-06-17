const user = require('../models/userModels');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const express= require('express');

exports.registeruser = catchAsyncErrors(async (req, res, next) => {
        console.log("Request body received:", req.body);

        const { name, email, password, confirmPassword } = req.body;
        const userExists = await user.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const newUser = await user.create({
            name,
            email,
            password,
            confirmPassword
        });
        const  token = newUser.getJWTToken();
        const options={
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.status(201).cookie('token',token,options).json({
            success: true,
            message: 'User registered successfully',
            newUser,
            token
        });
        });
exports.loginuser = catchAsyncErrors(async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter email and password' });
        }
        const userExists = await user.findOne({ email }).select('+password');
        if (!userExists) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordMatched = await userExists.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = userExists.getJWTToken();
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.status(200).cookie('token',token,options).json({
            success: true,
            message: 'User logged in successfully',
            user: userExists,
            token
        });
    });

