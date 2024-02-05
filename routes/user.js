const express = require('express')
const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require('../controllers/user')

const router = express.Router();

router.route('/').get(handleGetAllUsers).post(handleCreateNewUser)

// single route 
router.route('/:id')
    .get(handleGetUserById)

    .put(handleUpdateUserById)

    .delete(handleDeleteUserById)

module.exports = router;
