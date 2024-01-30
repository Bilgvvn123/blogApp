const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "Та хэрэглэгчийн нэрээ оруулна "],
		maxlength: [150, "Ихдээ 150 тэмдэгт оруулна уу"],
		minlength: [1, "Багадаа 1 тэмдэгт оруулна "],
	},
	email: {
		type: String,
		match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email буруу байна"],
		unique: true,
		required: [true, "Та хэрэглэгчийн нэрээ оруулна "],
		maxlength: [150, "Ихдээ 150 тэмдэгт оруулна уу"],
	},
	password: {
		type: String,
		required: [true, "Та хэрэглэгчийн password-оо оруулна "],
		maxlength: [150, "Ихдээ 150 тэмдэгт оруулна уу"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.methods.checkPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.methods.getJwt = function () {
	const token = jwt.sign(
		{ id: this._id, email: this.email },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRE }
	);
	return token;
};

UserSchema.pre("save", async function () {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(this.password, salt);
	this.password = hashedPassword;
});

module.exports = mongoose.model("users", UserSchema);
