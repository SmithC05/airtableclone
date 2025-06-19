const {config} =require('dotenv');
const mongoose = require('mongoose');
const validator = require('validator');
const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the table name'],
  },
  description: {
    type: String,
    required: [true, 'Please enter the table description'],
  },
  columns: [
    {
      name: {
        type: String,
        required: [true, 'Column name is required'],
      },
      dataType: {
        type: String,
        required: [true, 'Data type is required'],
        enum: ['String', 'Number', 'Date', 'Boolean'],
      },
      owner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
        },
      isPrimaryKey: {
        type: Boolean,
        default: false,
      },
      isNullable: {
        type: Boolean,
        default: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Table = mongoose.model('Table', tableSchema);
module.exports = Table;
