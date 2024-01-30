const Blog = require("../models/Blog");
const mongoose = require("mongoose");

exports.getBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find();

		if (!blogs)
			return res.stutus(400).json({
				success: false,
				error: "Дата олдсонгүй",
			});

		return res.status(200).json({
			success: false,
			blogs,
		});
	} catch (err) {
		return res.stutus(500).json({
			success: false,
			error: err.message,
		});
	}
};

exports.getBlog = async (req, res) => {
	const { blogId } = req.params;

	try {
		const blog = await Blog.findById(blogId);

		if (!blog)
			return res.status(400).json({
				success: false,
				error: "Дата олдсонгүй та id-гаа шалгана уу",
			});

		return res.status(200).json({
			success: true,
			blog,
		});
	} catch (err) {
		return res.stutus(500).json({
			success: false,
			error: err.message,
		});
	}
};

exports.createBlog = async (req, res) => {
	req.body.createdUser = req.user.id;

	try {
		const blog = await Blog.create(req.body);

		if (!blog)
			return res.status(400).json({
				success: false,
				error: "Дата нэмэгдсэнгүй",
			});

		return res.status(200).json({
			success: true,
			blog,
		});
	} catch (err) {
		return res.stutus(500).json({
			success: false,
			error: err.message,
		});
	}
};

exports.deleteBlog = async (req, res) => {
	const { blogId } = req.params;

	try {
		const b = await Blog.findById(blogId);
		if (b.createdUser.toString() !== req.user.id)
			return res.status(401).json({
				success: false,
				error: "Таны эрх хүрэхгүй байна",
			});

		const blog = await Blog.findByIdAndDelete(blogId);

		if (!blog)
			return res.status(400).json({
				success: false,
				error: "Дата устсангүй та id-гаа шалгана уу",
			});

		return res.status(200).json({
			success: true,
			blog,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: err.message,
		});
	}
};

exports.updateBlog = async (req, res) => {
	const { blogId } = req.params;

	try {
		const createdUser = await Blog.findById(blogId);
		if (createdUser.id !== req.user.id)
			return res.status(401).json({
				success: false,
				error: "Таны эрх хүрэхгүй байна",
			});

		const blog = await Blog.findByIdAndUpdate(blogId, req.body);

		if (!blog)
			return res.status(400).json({
				success: false,
				error: "Дата өөрчлөгдсөнгүй",
			});

		return res.status(200).json({
			success: true,
			blog,
		});
	} catch (err) {
		return res.stutus(500).json({
			success: false,
			error: err.message,
		});
	}
};

exports.getUserBlogs = async (req, res) => {
	const { userId } = req.params;

	try {
		const blogs = await Blog.find({ createdUser: userId });

		if (!blogs)
			return res.status(400).json({
				success: false,
				error: "Дата олдсонгүй",
			});

		return res.status(200).json({
			success: true,
			blogs,
		});
	} catch (err) {
		return res.stutus(500).json({
			success: false,
			error: err.message,
		});
	}
};
