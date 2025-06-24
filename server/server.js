const express=require('express');
const app=express();
const path=require('path');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database.js');
const authRoutes = require('./routes/auth.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const tableRoutes = require('./routes/table.js');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));
dotenv.config({ path: path.join(__dirname, "config/config.env") });
connectDatabase();
app.use('/api/v1', authRoutes);
app.use('/api/v1', tableRoutes);
app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});