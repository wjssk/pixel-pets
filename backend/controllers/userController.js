const { User, Pet, Mood } = require('../models/user');

exports.updateHasPet = async (req, res) => {
  const userId = req.params.id;
  const hasPet = req.body.hasPet;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { hasPet },
      { new: true },
    );
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
};
