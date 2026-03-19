import express from 'express'
import keys from './src/config/key.js'
import mongoose from 'mongoose';
import session from 'express-session';
import userRouter from './src/routes/user.js'
import reelRoutes from './src/routes/ReelsRoutes.js'
import connectMongoDBSession from "connect-mongodb-session";
const MONGO_URL = keys.MONGO_URL;
import cors from 'cors';
const app = express();
const Port = keys.PORT;
const MongoDBStore = connectMongoDBSession(session);
//connection
mongoose.set("strictQuery",false);
mongoose.connect(MONGO_URL).then(() => {
  console.log("mongodb connected"); 
})

// cors connection 

app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}));
// middlewares
app.use(express.json())

//  stores user login session in db
var store = new MongoDBStore(
  {
    uri : MONGO_URL,
    collection : "mysessions",
  },
  function(err) {
    if(err){
      console.log(err);
    }
  }
)
//routes
app.use('/api/users', userRouter);
app.use('/api/reels', reelRoutes);

app.listen(Port,()=> {
console.log(`server running on : ${Port}`);
})