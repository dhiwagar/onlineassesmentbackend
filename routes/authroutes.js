const express = require('express');
const { Createuser, LoginUseCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser, logout, handleRefreshToken } = require('../controller/usercrtl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', Createuser);
router.post('/login', LoginUseCtrl);
router.get('/alluser', authMiddleware, isAdmin, getallUser);
router.get('/:id', authMiddleware, isAdmin, getaUser);
router.delete('/:id', authMiddleware, isAdmin, deleteaUser);
router.put('/edit-user', authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

module.exports = router;
