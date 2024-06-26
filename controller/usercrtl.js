
const { generateToken } = require('../config/Jwttoken');
const User = require('../models/usermodal');
const asyncHandler=require("express-async-handler")
const validateMongoDbId = require("../utlis/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const Createuser=asyncHandler(async (req, res) => {
    const email =req.body.email;
    const findUser=await User.findOne({email:email})
     
    if(!findUser){
     const newuser=await User.create(req.body)
     res.json(newuser)
    }
    else{
    throw new Error('User Already Exists')
    }
   
   }
)
const LoginUseCtrl = asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findUser?._id);
      const updateuser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
res.json({
    _id: findUser?._id,
    firstname: findUser?.firstname,
    lastname: findUser?.lastname,
    email: findUser?.email,
    mobile: findUser?.mobile,
    token: generateToken(findUser?._id),
})
    }
    else {
        throw new Error("Invalid Credentials");
    }
})


// Get all users

const getallUser = asyncHandler(async (req, res) => {
    try {
      const getUsers = await User.find()
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  });
  // Get a single user
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    console.log(id)
  
    try {
      const getaUser = await User.findById(id);
      res.json({
        getaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(_id);
  
    try {
      const deleteaUser = await User.findByIdAndDelete(id);
      res.json({
        deleteaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
//   update user

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No Refresh token present in db or not matched");

  try {
    const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user._id);
    res.json({ accessToken });
  } catch (error) {
    throw new Error("There is something wrong with refresh token");
  }
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // No Content
  }
  await User.findOneAndUpdate({ refreshToken }, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // No Content
});

const updatedUser = asyncHandler(async (req, res) => {
  console.log(req.user,"user")
  const { _id } = req.user;
  validateMongoDbId(_id);
  console.log(_id , "log");

  try {
      const updatedUserData = await User.findByIdAndUpdate(
        _id,
          {
              firstname: req?.body?.firstname,
              lastname: req?.body?.lastname,
              email: req?.body?.email,
              mobile: req?.body?.mobile,
          },
          {
              new: true,
          }
      );
      res.json(updatedUserData);
  } catch (error) {
      throw new Error(error);
  }
});
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  console.log(id,"id")

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message:"User blocked"
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  console.log(id,"clg")

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked:false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

 
module.exports={Createuser,LoginUseCtrl,getaUser,getallUser,updatedUser,deleteaUser,unblockUser,blockUser,handleRefreshToken,logout}