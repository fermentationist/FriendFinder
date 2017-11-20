const htmlRoutes = function (app){
	const path = require("path");
	console.log("htmlRoutes.js loaded.");
	app.get("/survey", function (req, res){
		res.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	app.get("*", function (req, res){
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});
}

module.exports = htmlRoutes;