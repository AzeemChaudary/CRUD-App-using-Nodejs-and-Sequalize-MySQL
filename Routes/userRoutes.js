// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {getUsers ,  getUser , createUser , updateUser , deleteUser , forgetPassword , resetPassword } = require('../Controllers/userController.js');

router.get('/GetAllUsers', getUsers);
router.get('/GetSpecificUser/:id', getUser);
router.post('/Createuser', createUser);
router.put('/UpdateUser/:id', updateUser);
router.delete('/DeleteUser/:id', deleteUser);   
router.post('/forgetPassword', forgetPassword);
router.post('/ResetPassword' , resetPassword);
module.exports = router;
