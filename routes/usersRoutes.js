const router = require("express").Router();

const { register, login } = require("../controllers/users");

// http://localhost:2030/api/v1/auth
router.route("/").post(register);

// http://localhost:2030/api/v1/auth/login
router.route("/login").post(login);

module.exports = router;
