const apiRoutes = function (app){
	const FriendMatchModule = require("../data/FriendMatch.js");
	// const path = require("path");

	app.get("/api/friends", function (req, res){
		console.log("'GET' api/friends");
		res.sendFile(path.join(__dirname, "../data/friends.js"));
	});

	app.post("/api/friends/", function (req, res){
		console.log("POST received");
		FriendMatchModule.processUserData(req, res, FriendMatchModule.sendMatch);
	});
}

module.exports = apiRoutes;