const apiRoutes = function (app){
	const FriendMatch = require("../data/FriendMatch.js");
	const path = require("path");

	app.get("/api/friends", function (req, res){
		console.log("'GET' api/friends");
		res.sendFile(path.join(__dirname, "../data/friends.js"));
	});

	app.post("/api/friends/", function (req, res){
		console.log("POST received");
		FriendMatch.processUserData(req, res, FriendMatch.sendMatch);
	});
}

module.exports = apiRoutes;