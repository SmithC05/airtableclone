const {Table}= require('../models/tableModels');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
exports.createTable = catchAsyncErrors(async (req, res) => {
    const { name, fields } = req.body;
    if (!name || !fields || !Array.isArray(fields)) {
        return res.status(400).json({ message: 'Name and fields are required' });
    }
    const newTable = await Table.create({
        name,
        createdBy: req.user._id,
        fields
    });

    res.status(201).json({
        success: true,
        message: 'Table created successfully',
        table: newTable
    });
});
exports.getSingleTable = catchAsyncErrors(async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (!table) {
    return res.status(404).json({ success: false, message: "Table not found" });
  }
  res.status(200).json({ success: true, table });
});

exports.getAllTables = catchAsyncErrors(async (req, res) => {
    const tables = await Table.find({ createdBy: req.user._id }).populate('createdBy', 'name email');
    
    res.status(200).json({
        success: true,
        tables
    });
});
exports.updateTable = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const { name, fields } = req.body;

    if (!name || !fields || !Array.isArray(fields)) {
        return res.status(400).json({ message: 'Name and fields are required' });
    }

    const updatedTable = await Table.findByIdAndUpdate(id, {
        name,
        fields
    }, { new: true });

    if (!updatedTable) {
        return res.status(404).json({ message: 'Table not found' });
    }

    res.status(200).json({
        success: true,
        message: 'Table updated successfully',
        table: updatedTable
    });
});
exports.deleteTable = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;

    const deletedTable = await Table.findByIdAndDelete(id);

    if (!deletedTable) {
        return res.status(404).json({ message: 'Table not found' });
    }

    res.status(200).json({
        success: true,
        message: 'Table deleted successfully'
    });
});
exports.addRowToTable = async (req, res) => {
  try {
    const { row } = req.body;
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ success: false, message: "Table not found" });

    table.rows.push(row);
    await table.save();

    res.status(200).json({ success: true, updatedTable: table });
  } catch (err) {
    console.error("Error adding row:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.updateRowInTable = async (req, res) => {
  try {
    const { id, rowIndex } = req.params;
    const { updatedRow } = req.body;

    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ success: false, message: "Table not found" });

    table.rows[rowIndex] = updatedRow;
    await table.save();

    res.status(200).json({ success: true, updatedTable: table });
  } catch (err) {
    console.error("Error updating row:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.deleteRowFromTable = async (req, res) => {
  try {
    const { id, rowIndex } = req.params;

    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ success: false, message: "Table not found" });

    table.rows.splice(rowIndex, 1);
    await table.save();

    res.status(200).json({ success: true, updatedTable: table });
  } catch (err) {
    console.error("Error deleting row:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
