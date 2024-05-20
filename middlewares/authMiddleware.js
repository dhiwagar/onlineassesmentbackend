const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require('../models/usermodal');
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if ( req?.headers?.authorization?.startsWith("Bearer")) {
        // Extract the token from the Authorization header
        token = req.headers.authorization.split(" ")[1];
    

  

    try {
          if (token) {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(decoded?.id)
     req.user = user 
     next()
        console.log(decoded);
    }
   
    } catch (error) {
        // Token verification failed
     
        throw new Error("Not authorized. Token expired or invalid.please login again");
    }
}
    else {
             
        throw new Error("There is no token attached to header.");
    
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (!adminUser || adminUser.role !== "admin") {
        return res.status(403).json({ error: "Not authorized. Token expired or invalid. Please login again." });
    } else {
        next();
    }
});


module.exports = {authMiddleware,isAdmin};
