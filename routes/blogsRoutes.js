const router = require("express").Router();

const { protect } = require("../middlewares/protect");

const {
	getBlogs,
	getBlog,
	createBlog,
	deleteBlog,
	updateBlog,
	getUserBlogs,
} = require("../controllers/blogs");

// http://localhost:2030/api/v1/blogs
router.route("/").get(getBlogs).post(protect, createBlog);

// http://localhost:2030/api/v1/blogs/id
router
	.route("/:blogId")
	.get(getBlog)
	.delete(protect, deleteBlog)
	.put(protect, updateBlog);

router.route("/:userId/blogs").get(getUserBlogs);

module.exports = router;
