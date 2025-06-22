const mongoose = require('mongoose');
const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Field name is required"],
    trim: true,
  },
  type: {
    type: String,
    enum: ['text', 'number', 'date', 'dropdown', 'checkbox', 'email', 'phone', 'url', 'rating', 'currency'],
    required: true,
  },
  options: [String],
  isRequired: Boolean,
});
const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Table name is required"],
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fields: [fieldSchema],
   rows: {
    type: [[String]], 
    default: [],
  },
}, { timestamps: true });

tableSchema.index({ name: 1, createdBy: 1 }, { unique: true });

const rowSchema = new mongoose.Schema({
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true,
  },
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true });
const Table = mongoose.model('Table', tableSchema);
const Row = mongoose.model('Row', rowSchema);

module.exports = {
  Table,
  Row
};
