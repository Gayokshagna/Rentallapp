const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Define database connection details
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define user schema for MongoDB
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['buyer', 'seller'], required: true }
});

// Hash password before saving user
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);

// Initialize Express app
const app = express();

// Configure CORS (adjust allowed origins if needed)
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL

// Parse incoming JSON data
app.use(express.json());

// Register user (replace with proper error handling and response)
app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      userType
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user (replace with proper error handling and response)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).json({ message: 'Invalid email or password' });

    // Generate JWT token here (optional for user authentication)

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const port = process.env.PORT || 5000; // Use environment variable or default port

app.listen(port, () => console.log(Server running on port ${port}));