const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const { email, password } = req.body
  try {
    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashed })
    await user.save()
    res.status(201).json({ message: 'User created' })
  } catch {
    res.status(500).json({ error: 'Signup failed' })
  }
}

exports.register=  async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    res.json({ token })
  } catch {
    res.status(500).json({ error: 'Login failed' })
  }
}
