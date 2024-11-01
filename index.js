const express = require('express');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
const cors = require('cors');
const app = express();

// app.use(cors({ origin: 'http://localhost:4000' }));
app.use(cors());
const port = process.env.port || 4000;
app.use(bodyParser.json()); // Add this line
app.use('/uploads',express.static('uploads'));

app.use('/home',(req,res)=>{
    res.send('Welcome to home page');
})
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);

mongoose.connect("mongodb+srv://naraparajusharvan01:Sharvan%402005@cluster0.avbb6.mongodb.net/SUBY?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})