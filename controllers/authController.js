const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, role, isVerified: false });

    const emailToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // const url = `http://localhost:${process.env.PORT || 5001}/api/auth/verify-email/${emailToken}`;
    const url = `${process.env.FRONTEND_URL}/verify-email?token=${emailToken}`;


    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log("Sending email to:", email);

    await transporter.sendMail({
      from: `"Local Services Finder" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your email',
      html: `Click <a href="${url}">here</a> to verify your email.`
    });

    console.log("✅ Email sent!");
    res.status(201).json({ message: 'Registration successful. Check your email to verify your account.' });
  } catch (err) {
    console.error("❌ Email send error:", err);
    res.status(500).json({ message: err.message });
  }
};

// VERIFY EMAIL
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({
      user: { id: user._id, name: user.name, email },
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
