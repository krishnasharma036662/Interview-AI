const usermodel = require('../models/user.model');
const Blacklist = require('../models/blacklist.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/** 
 * @name Register a new user
 * @description register a new user with name, email and password
 * @access Public
 */
async function register(req, res) {
  try {

    const { name, email, password } = req.body;  

    if(!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    let user = await usermodel.findOne({
      $or: [{ name }, { email }]
    });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    user = new usermodel({ name, email, password: hash });

    const token = jwt.sign(
      { id: user._id },
      process.env.jwt_secret,
      { expiresIn: '1h' }
    );

    res.cookie('token', token);

    await user.save();

    res.status(201).json({ msg: 'User registered successfully', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
}

/** 
 * @name login  user
 * @description login a user with email and password
 * @access Public
 */

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '1h' });
    res.cookie('token', token);
    res.status(200).json({ msg: 'User logged in successfully', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * @name logout user
 * @description logout a user by blacklisting the token
 * @access Private
 */
const logout = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ msg: 'No token provided' });
  }

  try {
    // Blacklist the token
    await Blacklist.create({ token });
    res.clearCookie('token');
    res.status(200).json({ msg: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};


/**
 * @name get current user
 * @description get the current logged in user
 * @access Private
 */

const getCurrentUser = async (req, res) => {
  try {
    const user = await usermodel.findById(req.user.id).select('-password');
    res.status(200).json({user:{
        id: user._id,
        name: user.name,
        email: user.email
    }});
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
};