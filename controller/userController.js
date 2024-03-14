const User = require('../model/userModel');
const Notification = require('../model/notificationModel');
const Match = require('../model/matchModel');

exports.register = async (req, res) => {
  try {
    const { name, email, phone, dob, gender, country, state, city, image } = req.body;
    
    // Check if user with the same phone number already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      dob,
      gender,
      country,
      state,
      city,
      image
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// userController.js
exports.login = async (req, res) => {
    try {
      const { phone } = req.body;
  
      // Find user by phone number
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  // userController.js
// For sending OTP, you might integrate with a third-party service like Twilio or use an OTP library.
// Here's a simple logic demonstrating the concept.

exports.sendOTP = async (req, res) => {
    try {
      const { phone } = req.body;
  
      // Generate OTP (You may use a library for generating OTP)
      const OTP = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit OTP
  
      // Send OTP to the user's phone number (e.g., via SMS or email)
      // Here you would call the service to send the OTP, for example, using Twilio
  
      res.status(200).json({ message: 'OTP sent successfully', OTP });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  // userController.js
exports.getProfile = async (req, res) => {
    try {
      // Fetch user profile based on user ID or any other identifier from authentication
      const user = req.user; // Assuming user is authenticated and available in request object
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  // userController.js
exports.editProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const updates = req.body;
  
      // Update user profile
      await User.findByIdAndUpdate(userId, updates);
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  // userController.js
exports.addMoneyToWallet = async (req, res) => {
    try {
      const userId = req.params.id;
      const { amount } = req.body;
  
      // Add money to user's wallet
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.wallet += amount;
      await user.save();
  
      res.status(200).json({ message: 'Money added to wallet successfully', walletBalance: user.wallet });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  // userController.js
exports.walletTransactionHistory = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Fetch user's wallet transaction history
      const user = await User.findById(userId).populate('transactions');
  
      res.status(200).json({ transactions: user.transactions });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


exports.listMatches = async (req, res) => {
  try {
    // Fetch list of matches
    const matches = await Match.find({}, 'team1 team2 date');

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addNotification = async (req, res) => {
  try {
    const { message } = req.body;

    // Create new notification
    const newNotification = new Notification({ message });
    await newNotification.save();

    res.status(201).json({ message: 'Notification added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// notificationController.js
exports.listNotifications = async (req, res) => {
    try {
      // Fetch list of notifications
      const notifications = await Notification.find({}, 'message createdAt');
  
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
