// controllers/userController.js
const  User  = require('../Model/user.js');

const getUsers= async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUser  = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  const { username, password, token } = req.body;
  try {
    const user = await User.create({ username, password, token });
    res.json({user , message:"User Created Successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, token } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.username = username;
    user.password = password;
    user.token = token;
    await user.save();
    res.json({user , message :"User Updated Successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const { v4: uuidv4 } = require('uuid'); 


const forgetPassword = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = uuidv4();

    await user.update({ resetToken });

    res.json({ resetToken }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const resetPassword = async (req, res) => {
  const { resetToken, password } = req.body;
  try {
    
    const user = await User.findOne({ where: { resetToken } });
    if (!user) {
      return res.status(404).json({ error: 'User not found or invalid reset token' });
    }

    
    user.password = password;
    user.resetToken = null; 
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports={ getUsers ,  getUser , createUser , updateUser , deleteUser , forgetPassword , resetPassword}
