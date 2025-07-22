const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');

const PORT = 4000;
const app = express();

const MONGO_URI = 'mongodb://localhost:27017/myapp';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

// Import your models - adjust paths as per your project structure
const Admin = require('./db/Admin/Admin');
const users = require('./db/Users/userschema');
const seller = require('./db/Seller/Sellers');
const items = require('./db/Seller/Additem');
const myorders = require('./db/Users/myorders');
const WishlistItem = require('./db/Users/Wishlist');  // Wishlist schema

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173"],  // Your React app URL
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));

// --- USER ROUTES ---

// Signup
app.post('/signup', async (req, resp) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await users.findOne({ email });
    if (existingUser) return resp.json("Already have an account");

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.create({ name, email, password: hashedPassword });

    resp.json("Account Created");
  } catch (err) {
    resp.json("Failed to create account: " + err.message);
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email });
    if (!user) return res.json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json("Invalid Password");

    res.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.json("Login failed: " + error.message);
  }
});

// --- ADMIN ROUTES ---
app.post('/alogin', (req, resp) => {  
  const { email, password } = req.body;   
  Admin.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          return resp.json({ Status: "Success", user: { id:user.id,name: user.name, email: user.email } })
        } else {
          resp.json("login fail")
        }
      } else {
        resp.json("no user")
      }
    })
});

app.post('/asignup', (req, resp) => {
  const { name, email, password } = req.body;
  Admin.findOne({ email: email })
    .then(use => {
      if (use) {
        resp.json("Already have an account")
      } else {
        Admin.create({ email: email, name: name, password: password })
          .then(result => resp.json("Account Created"))
          .catch(err => resp.json(err))
      }
    }).catch(err => resp.json("failed "))
});

// --- SELLER ROUTES ---
app.post('/slogin', (req, resp) => {
  const { email, password } = req.body;
  seller.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          return resp.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } })
        } else {
          resp.json("login fail")
        }
      } else {
        resp.json("no user")
      }
    })
});

app.post('/ssignup', (req, resp) => {
  const { name, email, password } = req.body;
  seller.findOne({ email: email })
    .then(use => {
      if (use) {
        resp.json("Already have an account")
      } else {
        seller.create({ email: email, name: name, password: password })
          .then(result => resp.json("Account Created"))
          .catch(err => resp.json(err))
      }
    }).catch(err => resp.json("failed "))
});

// --- WISHLIST ROUTES ---

// Get wishlist items for a user
app.get('/wishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await WishlistItem.findOne({ userId }).populate('items');
    if (!wishlist) {
      return res.json([]);
    }
    res.json(wishlist.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove an item from wishlist
app.post('/wishlist/remove', async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
      return res.status(400).json({ error: 'UserId and ItemId are required' });
    }

    const wishlist = await WishlistItem.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(id => id.toString() !== itemId);
    await wishlist.save();

    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Other routes for items, orders, etc. ---
// Add your other existing routes here, unchanged.

// Start server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
