import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
  } ,
  password :{
    type : String,
    required : function () { return !this.googleId}
  } ,
  verify : {
    type : Boolean,
    default : false
  } ,
  googleId : {
    type : String,
    required : function () {!this.password}
  } ,
  picture : {
    type :String,
    trim :true,
    default : "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
   },
   about : {
    type : String,
    maxLength : 500,
  } ,
  likes : {
    type : Array,
    default : [],
  } ,
  bookmarks : {
    type : Array ,
    default : [],
  },
  posts : {
    type : Array,
    default : []
  } ,
  following : {
    type : Array,
    default : [],
  } ,
  followersCount : {
    type : Number,
    default : 0
  } ,
  likeslist : {
    type : Map,
    of : Boolean
  } ,
  bookmarkslist : {
    type : Map,
    of : Boolean,
  } 
}, {timestamps : true} ,);

const User = mongoose.model('user', userSchema);

export default User;