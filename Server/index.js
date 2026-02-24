import express from 'express'
import keys from './src/config/key.js'
import mongoose from 'mongoose';
import session from 'express-session';
import pkg from 'connect-mongodb-session';
const { MongoDBStore } = pkg;
const MONGO_URL = keys.MONGO_URL;
const app = express();
const Port = keys.PORT;


mongoose.connect(MONGO_URL).then(() => {
  console.log("mongodb connected"); 
})

app.listen(Port,()=> {
console.log(`server running on : ${Port}`);
})