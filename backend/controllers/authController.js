const jwt = require('jsonwebtoken');
const { User, Pet, Mood } = require('../models/user');
const bcrypt = require('bcryptjs');
const validatePassword = (password) => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
  return regex.test(password);
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', email: '', password: '' };

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (err.code === 11000) {
    errors.username = 'Username already exists';
    errors.email = 'Email already exists';
    return errors;
  }

  return errors;
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!validatePassword(password)) {
    res.status(400).json({ error: 'Invalid password format.' });
    return;
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    const maxAge = 24 * 60 * 60;
    const token = jwt.sign({ id: user._id }, process.env.secret, {
      expiresIn: maxAge,
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw Error('Incorrect username');
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw Error('Incorrect password');
    }
    const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 5 * 60 * 60; // 7 days or 5 hour
    const token = jwt.sign({ id: user._id }, process.env.secret, {
      expiresIn: maxAge,
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.logoutUser = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
  res.status(200).json({ logout: true });
};

exports.isAuthenticated = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.secret, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({ isAuthenticated: false });
      } else {
        const user = await User.findById(decodedToken.id);
        res.status(200).json({ isAuthenticated: true, user });
      }
    });
  } else {
    res.status(400).json({ isAuthenticated: false });
  }
};
