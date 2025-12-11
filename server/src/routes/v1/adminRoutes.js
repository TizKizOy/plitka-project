const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/v1/adminController");
const isAuthenticated =
  require("../../middlewares/isAuthenticated").isAuthenticated;

router.post("/login", adminController.login);
router.post("/refresh", adminController.refresh);
router.post("/logout", adminController.logout);
router.get("/protected", isAuthenticated, adminController.protected);

module.exports = router;
