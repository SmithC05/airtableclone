const {config} =require('dotenv');
const mongoose = require('mongoose');


const fieldSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['text', 'number', 'date', 'dropdown', 'checkbox', 'email', 'phone', 'url', 'rating', 'currency'],
  },
  options: [String], 
  required: Boolean,
});

const tableSchema = new mongoose.Schema({
  name: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  fields: [fieldSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Table', tableSchema);