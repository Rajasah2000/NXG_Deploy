const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://rajasah30030:rajasah30030@dj.ucay6.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Failed to connect to the database: ${error.message}`);
    process.exit(1);  // Exit with an error code
  }
};

module.exports = connectDb;
