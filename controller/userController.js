const User = require('../model/userModel');
const Notification = require('../model/notificationModel');
const Match = require('../model/matchModel');
const WalletTransaction = require('../model/walletTransactionModel');


exports.register = async (req, res) => {
  try {
    const { name, email, phone, dob, gender, country, state, city, image } = req.body;
    
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

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
    res.status(500).json({ message: "Error in updating profile" });
  }
};


exports.login = async (req, res) => {
    try {
      const { phone } = req.body;
  
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: "Error in updating profile" });
    }
  };

  


exports.sendOTP = async (req, res) => {
    try {
      const { phone } = req.body;
  
      const OTP = Math.floor(1000 + Math.random() * 9000);
  
      //sir we can use  twilio for sending otp but i don't have the account details so I am not using it
  
      res.status(200).json({ message: 'OTP sent successfully', OTP });
    } catch (error) {
      res.status(500).json({ message: "Error in updating profile" });
    }
  };

  
exports.getProfile = async (req, res) => {
    try {
      const user_id = req.id;
        const user_data = await User.findOne({_id:user_id})
      res.status(200).json({ user_data });
    } catch (error) {
      res.status(500).json({ message: "Some error while fetching data" });
    }
  };

  
exports.editProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const updates = req.body;
  
      await User.findByIdAndUpdate(userId, updates);
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: "Error in updating profile" });
    }
  };

  

  exports.addMoneyToWallet = async (req, res) => {
    try {
      const userId = req.params.id;
      const { amount } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.wallet += amount;
  
      const walletTransaction = new WalletTransaction({
        userId: user._id,
        amount,
        type: 'credit',
        description: 'Added money to wallet'
      });
      await walletTransaction.save();
  
      await user.save();
  
      res.status(200).json({ message: 'Money added to wallet successfully', walletBalance: user.wallet });
    } catch (error) {
      res.status(500).json({ message: 'Error in updating profile' });
    }
  };

  
exports.walletTransactionHistory = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const transactions = await WalletTransaction.find({ userId });
  
      res.status(200).json({ transactions });
    } catch (error) {
      res.status(500).json({ message: 'Error in fetching wallet transactions' });
    }
  };
  

  exports.createMatch = async (req, res) => {
    try {
      const { team1, team2, date } = req.body;
  
      const newMatch = new Match({ team1, team2, date });
      await newMatch.save();
  
      res.status(201).json({ message: 'Match created successfully', match: newMatch });
    } catch (error) {
      res.status(500).json({ message: 'Error in creating match', error: error.message });
    }
  };


exports.listMatches = async (req, res) => {
  try {
    const matches = await Match.find({}, 'team1 team2 date');

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: "Error in updating profile" });
  }
};


exports.addNotification = async (req, res) => {
  try {
    const { message } = req.body;

    const newNotification = new Notification({ message });
    await newNotification.save();

    res.status(201).json({ message: 'Notification added successfully' });
  } catch (error) {
    res.status(500).json({ message: "Error in updating profile" });
  }
};


exports.listNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({}, 'message createdAt');
  
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ message: "Error in updating profile" });
    }
  };

  
