// // app.js

// require('dotenv').config(); // Load environment variables
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db'); // MongoDB connection
// const authRoutes = require('./routes/authRoutes'); // Auth route handler

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middlewares
// app.use(cors()); // Allow cross-origin requests
// app.use(express.json()); // Parse JSON requests

// // Logger to show incoming requests
// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request for: ${req.url}`);
//   next();
// });

// // Route for auth
// app.use('/api/auth', authRoutes);

// // Root route (optional)
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
  // console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const generateRouter = require('./routes/generateRouter'); // if you still need it
const ollamaRouter = require('./routes/ollama'); // ✅ ADD THIS LINE

const userSettingsRoutes = require("./routes/userSettings");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/user-settings", userSettingsRoutes);
// Logger
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', generateRouter); // if still used
app.use('/api', ollamaRouter);   // ✅ ADD THIS LINE

// Root
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
