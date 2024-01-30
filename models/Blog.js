const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, "Та гарчигаа заавал оруулна уу"],
		maxlength: [250, "Ихдээ 250 тэмдэгт оруулна"],
		minlength: [1, "Багадаа 1 тэмдэгт оруулна уу"],
	},
	description: {
		type: String,
		required: [true, "Та тайлбараа заавал оруулна уу"],
		maxlength: [2000, "Ихдээ 250 тэмдэгт оруулна"],
		minlength: [1, "Багадаа 1 тэмдэгт оруулна уу"],
	},
	createdUser: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},
	image: {
		type: String,
		default:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0hcxrGL4gaex-5FULCSKsdnQiBKQfkk0LrQ&usqp=CAU",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("blogs", BlogSchema);
