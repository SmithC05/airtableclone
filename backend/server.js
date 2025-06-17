const express=require('express');
const app=express();
const path=require('path');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const authRoutes = require('./routes/auth.js');
app.use(express.json());


dotenv.config({ path: path.join(__dirname, "config/config.env") });
connectDatabase();
app.use('/api/v1', authRoutes);

app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}
);