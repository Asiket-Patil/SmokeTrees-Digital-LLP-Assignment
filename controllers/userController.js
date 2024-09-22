// controllers/userController.js
const User = require('../model/user');
const Address = require('../model/address');

/**
 * Register a new user with an address
 * @route   POST /api/users/register
 * @access  Public
 */
exports.registerUser = async (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ message: 'Name and address are required.' });
  }

  try {
    // Create new user
    const newUser = new User({ name });
    const savedUser = await newUser.save();

    // Create new address
    const newAddress = new Address({
      address,
      user: savedUser._id,
    });
    const savedAddress = await newAddress.save();

    // Update user's addresses
    savedUser.addresses.push(savedAddress._id);
    await savedUser.save();

    res.status(201).json({
      message: 'User and address created successfully.',
      user: savedUser,
      address: savedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

/**
 * Get all users with their addresses
 * @route   GET /api/users
 * @access  Public
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('addresses');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
