const apiRoutes = function (app){
	const FriendMatchModule = require("../data/FriendMatch.js");
	const path = require("path");

	app.get("/api/friends", function (req, res){
		console.log("'GET' api/friends");
		res.sendFile(path.join(__dirname, {extensions: [".js"]}));
	});

	app.post("/api/friends/", function (req, res){
		let match = FriendMatchModule.processUserData(req, res);
		console.log("match is", match);
		res.sendFile(path.join(__dirname, "../public/modal.html"));
	});
}

module.exports = apiRoutes;