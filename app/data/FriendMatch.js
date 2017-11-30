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
				// findMatch(user, data);
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

	// function findMatch (user, friendList){
	// 	if (true){
	// 		reallyFindMatch(user);

	// 		}
	// 	let friends = friendList;
	// 	console.log('friends', typeof friends);
	// 	return user;
	// }

	function findMatch (user){
		let match = user;
		let score = Infinity;
		let friendList = [{"name":"robotToRobot","photo":"https://vignette.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711","scores":[3,4,3,1,4]},{"name":"robotToRobot","photo":"https://vignette.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711","scores":[5,2,3,3,2]},{"name":"robotToRobot","photo":"https://vignette.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711","scores":[3,4,3,1,4]}];
		friendList.forEach(function(friend){
			if (compareUsers(user, friend) <= score && user != friend){
				match = friend;
			}
		});
		return match;
	}




	// 	let scoreArray =  user.scores;
	// 	let x = scoreArray.reduce((n, sum) => sum + n);
	// 	console.log('scoreArray reduced =>', x);
	// 	let filePath = path.join(__dirname, "./friends.js");
	// 	let userScores;
	// 	fs.readFile(filePath, "utf8", function (error, data){
	// 		if (error){
	// 			console.log("error==>", error);
	// 			return user;
	// 		}
	// 		console.log("data =", (data));
	// 		console.log("compareUsers:", compareUsers(user, {scores: [3,4,3,1,4]}));
	// 		return user;

	// 	});
	// }

	function compareUsers (user1, user2){
		let u1 = user1.scores, u2 = user2.scores;
		let diffArray = [];
		u1.forEach(function(score, i){
			diffArray.push(Math.abs(u1[i] - u2[i]));
		});
		let diffScore = diffArray.reduce((n, sum) => sum + n);
		console.log('diffScore', diffScore);
		return diffScore;

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