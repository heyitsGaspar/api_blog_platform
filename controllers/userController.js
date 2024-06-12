const User = require('../models/user');


exports.getProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ where: { user_id: req.userId } });
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { bio, avatar_url } = req.body;

  try {
    const userProfile = await UserProfile.findOne({ where: { user_id: req.userId } });
    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    userProfile.bio = bio || userProfile.bio;
    userProfile.avatar_url = avatar_url || userProfile.avatar_url;
    await userProfile.save();

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
