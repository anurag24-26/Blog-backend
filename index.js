const express = require("express");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const authRoute = require("./routes/auth"); // ✅ Import this line
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};
connectDB();

// Middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: "https://blog-frontend-4kkm.onrender.com", // Replace with your frontend URL
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoute); // ✅ Now `authRoute` is defined
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`App is running on port ${PORT}`);
});
