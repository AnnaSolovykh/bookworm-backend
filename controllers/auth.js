const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res
        .status(StatusCodes.CREATED)    
        .json({ user:{
            name: user.name
        }, 
        token });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    
    const token = user.createJWT();
    res 
        .status(StatusCodes.OK)
        .json({ 
            user: { 
                name: user.name
            }, 
            token 
        });
};

const logout = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            const errorMessage = 'Logout failed';
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: errorMessage });
        } else {
            return res
            .status(StatusCodes.OK)
            .json({ message: 'Logged out successfully' });
        }
    });
};

module.exports = {
    register,
    login,
    logout
};