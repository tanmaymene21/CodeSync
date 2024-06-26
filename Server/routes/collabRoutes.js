const express = require('express');
const {
  createCollab,
  getCollabs,
  getCollabById,
  deleteCollab,
} = require('../controller/collabController');

const router = express.Router();

router.post('/', createCollab);
router.get('/', getCollabs);
router.get('/:id', getCollabById);
router.delete('/:id', deleteCollab);

module.exports = router;
