const Snippet = require('../model/Snippet');
const axios = require('axios');

exports.createSnippet = async (req, res) => {
  const { name, code, theme, language, gradient } = req.body;
  const accessToken = req.headers?.authorization.split(' ')[1];

  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userId = response.data.sub;

    const newSnippet = new Snippet({
      name,
      code,
      theme,
      language,
      gradient,
      userId,
    });
    await newSnippet.save();

    res.status(201).json(newSnippet);
  } catch (err) {
    console.error('Error creating snippet:', err);
    res
      .status(500)
      .json({ message: 'Error creating snippet', error: err.message });
  }
};

exports.getSnippets = async (req, res) => {
  const accessToken = req.headers?.authorization.split(' ')[1];

  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userId = response.data.sub;

    const snippets = await Snippet.find({ userId });
    res.status(200).json(snippets);
  } catch (err) {
    console.error('Error fetching snippets:', err);
    res
      .status(500)
      .json({ message: 'Error fetching snippets', error: err.message });
  }
};

exports.getSnippetById = async (req, res) => {
  const { id } = req.params;

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.status(200).json(snippet);
  } catch (err) {
    console.error('Error fetching snippet:', err);
    res
      .status(500)
      .json({ message: 'Error fetching snippet', error: err.message });
  }
};

exports.deleteSnippet = async (req, res) => {
  const { id } = req.params;
  const accessToken = req.headers?.authorization.split(' ')[1];

  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userId = response.data.sub;

    const snippet = await Snippet.findById(id);
    if (!snippet || snippet.userId !== userId) {
      return res
        .status(404)
        .json({ message: 'Snippet not found or unauthorized' });
    }

    await snippet.remove();
    res.status(200).json({ message: 'Snippet deleted' });
  } catch (err) {
    console.error('Error deleting snippet:', err);
    res
      .status(500)
      .json({ message: 'Error deleting snippet', error: err.message });
  }
};

exports.updateSnippet = async (req, res) => {
  const { id } = req.params;
  const { name, code, theme, language, gradient } = req.body;
  const accessToken = req.headers?.authorization.split(' ')[1];

  try {
    const response = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userId = response.data.sub;

    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    if (snippet.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    snippet.name = name || snippet.name;
    snippet.code = code || snippet.code;
    snippet.theme = theme || snippet.theme;
    snippet.language = language || snippet.language;
    snippet.gradient = gradient || snippet.gradient;

    await snippet.save();

    res.status(200).json(snippet);
  } catch (err) {
    console.error('Error updating snippet:', err);
    res
      .status(500)
      .json({ message: 'Error updating snippet', error: err.message });
  }
};
