const table= require('../models/tableModels');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const express = require('express');


exports.createTable = catchAsyncErrors(async (req, res, next) => {
    const { name, fields } = req.body;
    if (!name || !fields || !Array.isArray(fields)) {
        return res.status(400).json({ message: 'Name and fields are required' });
    }

    const newTable = await table.create({
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
exports.getAllTables = catchAsyncErrors(async (req, res, next) => {
    const tables = await table.find({ createdBy: req.user._id }).populate('createdBy', 'name email');
    
    res.status(200).json({
        success: true,
        tables
    });
});
exports.updateTable = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name, fields } = req.body;

    if (!name || !fields || !Array.isArray(fields)) {
        return res.status(400).json({ message: 'Name and fields are required' });
    }

    const updatedTable = await table.findByIdAndUpdate(id, {
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
exports.deleteTable = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const deletedTable = await table.findByIdAndDelete(id);

    if (!deletedTable) {
        return res.status(404).json({ message: 'Table not found' });
    }

    res.status(200).json({
        success: true,
        message: 'Table deleted successfully'
    });
});
