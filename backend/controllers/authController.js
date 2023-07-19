const jwt = require('jsonwebtoken');
const { User, Pet, Mood } = require('../models/user');
const bcrypt = require('bcryptjs');
const validatePassword = (password) => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
  return regex.test(password);
};

const initializeErrors = () => ({
  username: '',
  email: '',
  password: '',
  login: '',
});

const handleErrors = (err, customErrors) => {
  console.log(err.message, err.code);
  let errors = customErrors || initializeErrors();

  if (err.code === 11000) {
    if (err.message.includes('username')) {
      errors.username = 'Username already exists';
    }
    if (err.message.includes('email')) {
      errors.email = 'Email already exists';
    }
  }
  return errors;
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  let errors = initializeErrors();

  if (!validatePassword(password)) {
    errors.password =
      'Password has to have at least: 5 characters, 1 lower- and uppercase letter and 1 digit.';
  }

  const existingUsername = await User.findOne({ username });
  const existingEmail = await User.findOne({ email });

  if (existingUsername) {
    errors.username = 'Username already exists';
  }

  if (existingEmail) {
    errors.email = 'Email already exists';
  }

  if (errors.username || errors.email || errors.password) {
    console.log(errors);
    res.status(400).json({ errors });
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
    errors = handleErrors(error, errors);
    res.status(400).json({ errors });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password, rememberMe } = req.body;
  let errors = initializeErrors();

  try {
    const user = await User.findOne({ username });
    if (!user) {
      errors.login = 'Incorrect username or password';
      res.status(400).json({ errors });
      return;
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      errors.login = 'Incorrect username or password';
      res.status(400).json({ errors });
      return;
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
    errors = handleErrors(error, errors);
    res.status(400).json({ errors });
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
