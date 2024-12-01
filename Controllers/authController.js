const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validateEmail } = require('../Utils/common.js');

dotenv.config();

// Register User
exports.register = async (req, res) => {
    try {
        const { fname, lname, email, password, confirmPassword, phone, address } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        if (validateEmail(email) === false) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            fname,
            lname,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone,
            address
        });

        // Save user to the database
        await user.save();
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, roles: user.roles },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        user.password = undefined;

        res.status(200).json({
            message: 'Signup successful',
            token,
            success: true,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        if (validateEmail(email) === false) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, roles: user.roles },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        user.password = undefined;

        res.status(200).json({
            message: 'Login successful',
            token,
            success: true,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
