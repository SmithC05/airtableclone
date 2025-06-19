const table= require('../models/tableModels');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const express = require('express');


exports.createTable = catchAsyncErrors(async (req, res, next) => {
    const { name, description, columns } = req.body;

    if (!name || !description || !columns || columns.length === 0) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newTable = await table.create({
        name,
        description,
        columns,
        owner: req.user.id 
    });

    res.status(201).json({
        success: true,
        message: 'Table created successfully',
        table: newTable
    });
});
exports.getAllTables = catchAsyncErrors(async (req, res, next) => {
    const tables = await table.find({ owner: req.user._id }).populate('owner', 'name email');

    res.status(200).json({
        success: true,
        tables
    });
});

exports.updateTable = catchAsyncErrors(async (req, res, next) => {
    const tableId = req.params.id;
    const { name, description, columns } = req.body;

    const updatedTable = await table.findByIdAndUpdate(
        tableId,
        { name, description, columns },
        { new: true, runValidators: true }
    );

    if (!updatedTable) {
        return res.status(404).json({ message: 'Table not found' });
    }

    res.status(200).json({
        success: true,
        message: 'Table updated successfully',
        table: updatedTable
    });
});
exports.deleteTable = catchAsyncErrors(async (req, res, next) => {
    const tableId = req.params.id;

    const deletedTable = await table.findByIdAndDelete(tableId);

    if (!deletedTable) {
        return res.status(404).json({ message: 'Table not found' });
    }

    res.status(200).json({
        success: true,
        message: 'Table deleted successfully'
    });
});

