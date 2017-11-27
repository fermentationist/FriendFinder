const apiRoutes = function (app){
	const FriendMatchModule = require("../data/FriendMatch.js");
	const path = require("path");

	app.get("/api/friends", function (req, res){
		console.log("'GET' api/friends");
		res.sendFile(path.join(__dirname, "../data/friends.js"));
	});

	app.post("/api/friends/", function (req, res){
		console.log("POST received");
		let match = FriendMatchModule.processUserData(req, res);
		res.header("Content-Type", "application/json");
		res.json(JSON.stringify(match));
		// res.sendFile(path.join(__dirname, "../public/modal.html"));
	});
}

module.exports = apiRoutes;