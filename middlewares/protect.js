const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
	if (!req.headers.authorization)
		return res.json({
			success: false,
			error: "Таны эрх хүрэхгүй байна",
		});

	const token = req.headers.authorization.split(" ")[1];

	if (!token)
		return res.json({
			success: false,
			error: "token байхгүй байна",
		});

	const userObj = jwt.verify(token, process.env.JWT_SECRET);

	req.user = userObj;
	if (userObj) next();
};
