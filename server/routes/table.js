const express = require('express');
const router = express.Router();
const {createTable,getAllTables,updateTable,deleteTable,} = require('../controller/tablecontroller');
const { isAuthenticatedUser } = require('../middleware/authentication');

router.route('/tables')
  .post(isAuthenticatedUser, createTable)
  .get(isAuthenticatedUser, getAllTables);

router.route('/tables/:id')
  .put(isAuthenticatedUser, updateTable)
  .delete(isAuthenticatedUser, deleteTable);


module.exports = router;
