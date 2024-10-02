const express = require("express");
const connectDb = require("./config/db");
const authRoutes = require("./config/routes/authRoutes");

const app = express();
const port = 8025;

//  Middleware for passing JSON
app.use(express.json());

app.use("/api", authRoutes);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
});
