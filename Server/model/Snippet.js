const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    gradient: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Snippet', SnippetSchema);
