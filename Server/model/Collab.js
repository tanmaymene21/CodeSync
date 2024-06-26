const mongoose = require('mongoose');
const { Schema } = mongoose;

const collabSchema = new Schema(
  {
    name: { type: String, default: 'Untitled' },
    code: { type: String, default: '// Start coding...' },
    language: { type: String, default: 'JavaScript' },
    theme: { type: String, default: 'githubDark' },
    fontSize: { type: Number, default: 16 },
    participants: [{ socketId: String, username: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Collab', collabSchema);
