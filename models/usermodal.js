const mongoose = require('mongoose');
const bcrypt= require("bcrypt")

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  mobile:{type:String, required:true, unique:true},
  role: {
    type: String,
    default: "user",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
 
  refreshToken: {
    type: String,
  },
},{
  timestamps:true
});

userSchema.pre("save", async function(next){

  const salt = bcrypt.genSaltSync(10);
  this.password= await bcrypt.hash(this.password,salt)
})
userSchema.methods.isPasswordMatched = async function(enterPassword){
  return await bcrypt.compare(enterPassword,this.password)
}
module.exports = mongoose.model('User', userSchema);
