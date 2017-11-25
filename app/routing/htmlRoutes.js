const htmlRoutes = function (app){
	const path = require("path");
	console.log("htmlRoutes.js loaded.");
	app.get(["/survey", "/survey.html"], function (req, res){
		return res.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	app.get(["/home", "/"], function (req, res){
		return res.sendFile(path.join(__dirname, "../public/home.html"));
	});
}

module.exports = htmlRoutes;