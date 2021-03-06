const htmlRoutes = function (app){
	const path = require("path");
	console.log("htmlRoutes.js loaded.");
	app.get(["/survey", "/survey.html"], function (req, res){
		return res.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	app.get(["/home", "/"], function (req, res){
		return res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	app.get(["survey.js"], function (req, res){
		return res.sendFile(path.join(__dirname, "../public/assets/js/survey.js"));
	});

	app.get(["modal.js"], function (req, res){
		return res.sendFile(path.join(__dirname, "../public/assets/js/modal.js"));
	});
}

module.exports = htmlRoutes;