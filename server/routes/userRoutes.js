const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getUsers,
  getAdmins,
  getUser,
  getUserProfile,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.use(protect);
router.use(admin);

router.route("/").get(getUsers);
router.route("/admins").get(getAdmins);
router.route("/profile").get(getUserProfile);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
