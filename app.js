require('dotenv').config(); 
// const { MongoClient } = require("mongodb");

console.log('hi');
const uri = process.env.MONGODB_URI;
console.log(uri);
// const client = new MongoClient(uri);
