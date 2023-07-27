// controllers/userController.js
const  User  = require('../Model/user.js');
const { v4: uuidv4 } = require('uuid');
const {sendResetPasswordEmail} = require('../Services/email.js')
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
  const { email } = req.params;
  try {
    const user = await User.findByPk(email);
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
  const { username, password, email  } = req.body;
  try {
    const user=await User.findByPk(email);
    if(user){
      res.status(405).json({ message:"User Already exists" })
    }
    const newUser = await User.create({ username, password, email });
    res.json({newUser , message:"User Created Successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  const { email } = req.params;
  const { username, password, token } = req.body;
  try {
    const user = await User.findByPk(email);
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
  const { email } = req.params;
  try {
    const user = await User.findByPk(email);
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


const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = uuidv4();

    const expirationTime = Date.now() + 3600000; // 1 hour in milliseconds

    await user.update({ resetToken, resetTokenExpiration: expirationTime });

    // Simulate sending an email with the reset link
    const resetLink = `http://localhost:3000/api/resetPassword/${resetToken}`;
 await sendResetPasswordEmail(user.email, resetLink);

    res.json({ message: 'Password reset link sent to user' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({ where: { resetToken: resetToken } });
    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired token' });
    }

    if (!user.resetToken || (user.resetTokenExpiration && Date.now() > user.resetTokenExpiration)) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    

    // Update the user's password and clear the resetToken and resetTokenExpiration fields
    await user.update({ password, resetToken: null, resetTokenExpiration: null });

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports={ getUsers ,  getUser , createUser , updateUser , deleteUser , forgetPassword , resetPassword}
