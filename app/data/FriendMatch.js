console.log("FriendMatch.js loaded.");

const FriendMatch = (function(){
	const path = require("path");
	const fs = require("fs");
	const bodyParser = require("body-parser");

	function processUserData (req, res, callback){
		console.log("processUserData called.");
		let user = req.body;
		console.log('user', user);
		if (isValid(user)){
			let match = findMatch(user);
			writeToFile(user);
			console.log("returning match", match);
			return callback(res, match);

		}else{
			return console.log("Invalid or incomplete submission. Please correct and retry.");
		}
	}

	function isValid (formInputObj){
		for (prop in formInputObj){
			if (!formInputObj[prop]){
				console.log(`isValid(${formInputObj}[${prop}]) = false`);
				return false;
			}
		}
		return true;
	}	

	function writeToFile (user){
		let filePath = path.join(__dirname, "./friends.js");
		let newData;
		fs.readFile(filePath, "utf8", function (error, data){
			if (error){
				throw error.stack;
			}
			if (data !== ""){
				findMatch(user, data);
				data = data.slice(1, data.length - 1);
				newData = `[${data},${JSON.stringify(user)}]`;
			}else{
				newData = `[${JSON.stringify(user)}]`;
			}
			fs.writeFile(filePath, newData, function (error){
				if (error){
					console.log("writeToFile failed.");
					throw error;
				}else{
					console.log("writeToFile successful.");
				}

			});

		})

	}

	function findMatch (userData){
		let filePath = path.join(__dirname, "./friends.js");
		let friends, oldData, newData;
		fs.readFile(filePath, "utf8", function (error, data){
			if (error){
				throw error.stack;
			}
			if (data !== ""){
				friends = data;
				oldData = data.slice(1, data.length - 1);
				console.log('oldData', oldData);
				newData = `[${oldData},${JSON.stringify(userData)}]`;
			}else{
				newData = `[${JSON.stringify(userData)}]`;
			}
			console.log("friends...", friends);
		return userData;
		});
	}

	function sendMatch (res, match){
		res.header("Content-Type", "application/json");
		return res.json(JSON.stringify(match));
	}

	return {
		processUserData: processUserData,
		sendMatch: sendMatch,
	};
})();

module.exports = FriendMatch;