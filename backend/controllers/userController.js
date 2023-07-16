const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validatePassword = (password) => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
  return regex.test(password);
};

exports.registerUser = async (req, res) => {
  try {
    if (!validatePassword(req.body.password)) {
      return res
        .status(400)
        .json({ message: 'Password does not meet the requirements' });
    }
    // Destructure password from req.body, leaving the rest of the fields in userFields
    const { password, ...userFields } = req.body;
    // Add userFields to a new User document
    const user = new User(userFields);
    // Manually assign the password so it can be hashed by the pre save middleware
    user.password = password;
    // Save the user
    await user.save();
    res
      .status(201)
      .json({ message: `Successfully registered user ${user.username}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.secret, {
      expiresIn: '1h',
    });

    // Send the token in the response
    res.status(200).json({ message: 'Logged in successfully', user, token });
    res.status(200).json({ message: 'Logged in successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
