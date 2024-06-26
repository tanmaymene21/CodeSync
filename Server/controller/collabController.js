require('dotenv').config();
const axios = require('axios');
const Collab = require('../model/Collab');

exports.createCollab = async (req, res) => {
  const { name, code, language, theme, fontSize } = req.body;
  const accessToken = req.headers?.authorization?.split(' ')[1];

  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}userinfo`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userId = response.data.sub;
    const newCollab = new Collab({
      name,
      code,
      language,
      theme,
      fontSize,
      userId,
      participants: [],
    });
    await newCollab.save();
    res.status(201).json(newCollab);
  } catch (error) {
    console.error('Error creating Collab:', error);
    res.status(500).json({ error: 'Failed to create collaboration' });
  }
};

exports.getCollabs = async (req, res) => {
  const accessToken = req.headers?.authorization?.split(' ')[1];

  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}userinfo`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userId = response.data.sub;
    const collabs = await Collab.find({ userId });
    res.status(200).json(collabs);
  } catch (error) {
    console.error('Error fetching Collabs:', error);
    res.status(500).json({ error: 'Failed to fetch collaborations' });
  }
};

exports.getCollabById = async (req, res) => {
  const { id } = req.params;

  try {
    const collab = await Collab.findById(id);
    if (!collab) {
      return res.status(404).json({ message: 'Collab not found' });
    }
    res.status(200).json(collab);
  } catch (error) {
    console.error('Error fetching Collab:', error);
    res
      .status(500)
      .json({ message: 'Error fetching Collab', error: error.message });
  }
};

exports.deleteCollab = async (req, res) => {
  const { id } = req.params;
  const accessToken = req.headers?.authorization?.split(' ')[1];

  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}userinfo`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userId = response.data.sub;
    const collab = await Collab.findById(id);

    if (!collab || collab.userId !== userId) {
      return res
        .status(404)
        .json({ message: 'Collab not found or unauthorized' });
    }

    await collab.remove();
    res.status(200).json({ message: 'Collab deleted' });
  } catch (error) {
    console.error('Error deleting Collab:', error);
    res
      .status(500)
      .json({ message: 'Error deleting Collab', error: error.message });
  }
};
