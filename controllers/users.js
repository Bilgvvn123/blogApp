const User = require("../models/User");

exports.register = async (req, res) => {
	const { email, username, password } = req.body;
	try {
		if (!email || !username || !password)
			return res.status(400).json({
				success: false,
				error: "Талбараа бүрэн бөглөнө үү",
			});

		const user = await User.create(req.body);

		return res.status(200).json({
			success: true,
			user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err.message,
		});
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password)
			return res.stutus(400).json({
				success: false,
				error: "Талбараа бүрэн бөглөнө үү",
			});

		const user = await User.findOne({ email }).select("+password");

		if (!user)
			return res.stutus(400).json({
				success: false,
				error: "Энэ email хаяг дээр бүртгэл үүсээгүй байна",
			});

		const ok = await user.checkPassword(password);

		if (!ok)
			return res.status(401).json({
				success: false,
				error: "Та нүүц үгээ шалгана уу",
			});

		return res.status(401).json({
			success: true,
			token: user.getJwt(),
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err.message,
		});
	}
};
