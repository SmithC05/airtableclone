const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const user = require('../models/userModels');
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'Please login to access this resource' });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decodedData.id);
    next();
});