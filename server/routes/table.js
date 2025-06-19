const express = require('express');
const router = express.Router();
const {createTable,getAllTables,updateTable,deleteTable,} = require('../controller/tablecontroller');
const { isAuthenticatedUser } = require('../middleware/authentication');

router.route('/tables').post(isAuthenticatedUser, createTable);
router.route('/tables').get(isAuthenticatedUser, getAllTables);
router.route('/tables/:id').put( updateTable);
router.route('/tables/:id').delete(deleteTable);  

module.exports = router;
