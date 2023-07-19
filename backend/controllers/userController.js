const { User, Pet, Mood } = require('../models/user');

exports.updateHasPet = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.id,
      { hasPet: true },
      { new: true },
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};
