const apiRoutes = function (app){
	const path = require("path");
	const fs = require("fs");
	const bodyParser = require("body-parser");

	console.log("apiRoutes.js loaded.");

	app.get("/api/friends", function (req, res){
		console.log("'GET' api/friends");
		res.sendFile(path.join(__dirname, "../data/friends.js"));
	});

	app.post("/api/friends/", function (req, res){
		let filePath = path.join(__dirname, "../data/friends.js");
		console.log("req.body", req.body);
		fs.readFile(filePath, "utf8", function (error, data){
			if (error){
				throw error;
			}
			console.log("file data = ", data);
			let newData;
			if (data !== ""){
				newData = `[${data},${JSON.stringify(req.body)}]`;
			// let testJSON = JSON.parse(newData);
			// console.log('testJSON', testJSON);
			// console.log('typeof testJSON', typeof testJSON);
			}else{
				newData = `[${JSON.stringify(req.body)}]`;
			}
			console.log('newData', newData);
			fs.writeFile(filePath, newData, function (error){
				if (error){
					throw error;
				}

			});
		});
	});

}

module.exports = apiRoutes;