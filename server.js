const express = require("express");

require("dotenv").config({ path: "./config/config.env" });
require("colors");

// database
const connectDb = require("./config/connectDb");

// routes
const blogsRoutes = require("./routes/blogsRoutes");
const usersRoutes = require("./routes/usersRoutes");

connectDb();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("<h1>Welcome to indraBlog's backend</h1>");
});

app.use("/api/v1/blogs", blogsRoutes);
app.use("/api/v1/auth", usersRoutes);

// comments

app.get("*", (req, res) => {
	res.send("<h1>Not Found 404 </h1><a href='/'>home</a>");
});

app.listen(process.env.PORT, () => {
	console.log(
		`Manai server ${process.env.PORT} port deer aslaa`.rainbow.bold
	);
});
