const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.JWT_SECRET);
const { validateEmail } = require('../Utils/common.js');
const { sendEmail, mailContent } = require('./mailController');

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
        let hashedpassword;
        try {
            hashedpassword = cryptr.encrypt(password);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "error in hashing password",
            });
        }

        // Create new user
        const user = new User({
            fname,
            lname,
            email: email.toLowerCase(),
            password: hashedpassword,
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

        // Send welcome email
        const emailContent = mailContent(`
        <div class="email-header">
                        <h1>Welcome to PCRM! 🚀</h1>
                    </div>
                    <div class="email-content">
                        <p>Hi <strong>${fname}</strong>,</p>
                        <p>Thank you for joining <strong>PCRM</strong>! We’re thrilled to have you on board.</p>
                        <p>Our platform is designed to simplify project management, boost productivity, and help you achieve your goals effortlessly. Here’s what you can do right away:</p>
                        <ul>
                            <li><strong>Create Projects:</strong> Start managing your tasks and workflows.</li>
                            <li><strong>Collaborate:</strong> Invite your team to work together seamlessly.</li>
                            <li><strong>Track Progress:</strong> Stay on top of deadlines with real-time updates.</li>
                        </ul>
                        <p><strong>Ready to get started?</strong></p>
                        <a href="https://pcrm.brokod.com/signin" class="cta-button">Log In to Your Account</a>
                        <p>If you have any questions or need assistance, our support team is here to help. Just reply to this email.</p>
                        <p>Welcome to the <strong>PCRM</strong> family! We’re excited to be part of your journey.</p>
                    </div>
                    <div class="footer">
                        <p>Best regards,</p>
                        <p><strong>PCRM Team</strong></p>
                        <p><a href="https://pcrm.brokod.com">PCRM.BROKOD.COM</a> | <a href="mailto:contact@brokod.com">contact@brokod.com</a></p>
                    </div>
          `)

        sendEmail(email, 'Welcome to PCRM 🚀', emailContent);

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
        const decryptedString = cryptr.decrypt(user.password);
        if (decryptedString != password) {
            return res.status(400).json({ message: 'Password Wrong' });
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

// reset password based on otp
exports.resetPassword = async (req, res) => {
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
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Hash the password
        let hashedpassword;
        try {
            hashedpassword = await cryptr.encrypt(password);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "error in hashing password",
            });
        }

        // Update password
        user.password = hashedpassword;
        await user.save();

        res.status(200).json({
            message: 'Password reset successful',
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}