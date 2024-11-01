const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const vendorRegister = async(req,res)=>{
    console.log("Register endpoint hit");  // Check if the request reaches here
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json({msg: 'Email already exists'});
        }
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
            });
            await newVendor.save();
            res.status(200).json({msg: 'Vendor registered successfully'});
    }catch(err){
        // console.error(err.message);
        res.status(500).json({msg: 'Error registering vendor'});
        console.log(err);
    }
}

const vendorLogin = async(req,res)=>{
    const {email, password} = req.body;
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !( await bcrypt.compare(password,vendor.password))){
            return res.status(400).json({msg: 'Invalid credentials'});
        }
        const payload = {vendorId: vendor._id};
        const token = jwt.sign(payload, 'jwtPass', {expiresIn:"1h"});
        // res.status(200).json({token});
        res.json({sucess:"login sucessful",token});
        console.log(email,token);
}catch(err){
    console.log(err);
}
}

const getAllVendors = async(req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors});
    } catch (error) {
        console.log(error);
    }
}
const getVendorById = async(req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        res.json({vendor});
    } catch (error) {
        console.log(error);
    }
}
module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById};