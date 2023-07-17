const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const MoodSchema = new mongoose.Schema({
  happiness: { type: Number, default: 50 },
  toilet: { type: Number, default: 50 },
  hunger: { type: Number, default: 50 },
  attention: { type: Number, default: 50 },
  dirtiness: { type: Number, default: 50 },
});

const PetSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name can't be empty"] },
  mood: { type: MoodSchema, default: () => ({}) },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username can't be empty"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email can't be empty"],
    unique: true,
    validate: [isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: [true, "Password can't be empty"],
    minlength: [5, 'Password has to have at least 5 characters'],
  },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  coins: { type: Number, default: 100 },
  hasPet: { type: Boolean, default: false },
  pet: { type: PetSchema, default: null },
});
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error('Incorrect password');
  }
  throw Error('Incorrect username');
};

module.exports = {
  User: mongoose.model('User', UserSchema),
  Pet: mongoose.model('Pet', PetSchema),
  Mood: mongoose.model('Mood', MoodSchema),
};
