require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//middleware
app.use(express.json());

//configure mongoose - FIXED: Removed callback, using promises
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log("MongoDB connection error:", err);
});

const blogRouter = require("./routes/BlogRoutes");
app.use("/api/blogs", blogRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;