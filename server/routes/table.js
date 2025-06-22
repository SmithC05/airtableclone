const express = require('express');
const router = express.Router();
const {
  createTable,
  getAllTables,
  getSingleTable,
  updateTable,
  deleteTable,
  addRowToTable,
  updateRowInTable,
  deleteRowFromTable,
} = require('../controller/tablecontroller');
const { isAuthenticatedUser } = require('../middleware/authentication');

router.route('/tables')
  .post(isAuthenticatedUser, createTable)
  .get(isAuthenticatedUser, getAllTables);

router.route('/tables/:id')
  .get(isAuthenticatedUser, getSingleTable)
  .put(isAuthenticatedUser, updateTable)
  .delete(isAuthenticatedUser, deleteTable);

router.post('/tables/:id/add-row', isAuthenticatedUser, addRowToTable);
router.put('/tables/:id/rows/:rowIndex', isAuthenticatedUser, updateRowInTable);
router.delete('/tables/:id/rows/:rowIndex', isAuthenticatedUser, deleteRowFromTable);

module.exports = router;
