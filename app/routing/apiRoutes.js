const apiRoutes = function (app){
	const FriendFinder = require("../data/FriendFinder.js");
	const path = require("path");

	app.get("/api/friends", function (req, res){
		console.log("'GET' api/friends");
		res.sendFile(path.join(__dirname, "../data/friends.js"));
	});

	app.post("/api/friends/", function (req, res){
		console.log("POST received");
		FriendFinder.processUserData(req, res, FriendFinder.sendMatch);
	});
}

module.exports = apiRoutes;