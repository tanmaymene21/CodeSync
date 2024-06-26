const express = require('express');
const {
  createSnippet,
  getSnippets,
  getSnippetById,
  deleteSnippet,
  updateSnippet,
} = require('../controller/snippetController');

const router = express.Router();

router.post('/', createSnippet);
router.get('/', getSnippets);
router.get('/:id', getSnippetById);
router.delete('/:id', deleteSnippet);
router.put('/:id', updateSnippet);

module.exports = router;
