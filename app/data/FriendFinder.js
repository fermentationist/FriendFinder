console.log("FriendFinder.js loaded.");
const FriendFinder = (function(){
	const path = require("path");
	const fs = require("fs");
	const bodyParser = require("body-parser");

	function User (jsonUserObj, res){
		const that = this;
		let newUser;
		this.user = jsonUserObj;
		this.res = res;
		this.name = jsonUserObj.name;
		this.match = this.user;
		this.friendList = [];

		this.writeToFile = function (callback, finalCallback){
			let filePath = path.join(__dirname, "./friends.js");
			let newData;
			fs.readFile(filePath, "utf8", function (error, data){
				if (error){
					throw error.stack;
				}
				
				if (data !== ""){
					that.friendList = JSON.parse(data);
					// findMatch(user, data);
					data = data.slice(1, data.length - 1);
					newData = `[${data},${JSON.stringify(that.user)}]`;
				}else{
					newData = `[${JSON.stringify(that.user)}]`;
				}
				fs.writeFile(filePath, newData, function (error){
					if (error){
						console.log("writeToFile failed.");
						throw error;
					}else{
						console.log("writeToFile successful.");
						return callback(finalCallback);
					}

				});

			})

		}

		this.findMatch = function (callback){
			let score = Infinity;
			let filePath = path.join(__dirname, "./friends.js");
			let newData;
			// let friendList = [{"name":"robotToRobot","photo":"https://vignette.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711","scores":[3,4,3,1,4]},{"name":"robotToRobot","photo":"https://vignette.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711","scores":[5,2,3,3,2]},{"name":"robotToRobot","photo":"https://vignette.wikia.nocookie.net/seinfeld/images/7/76/George-costanza.jpg/revision/latest?cb=20110406222711","scores":[3,4,3,1,4]}];
			that.friendList.forEach(function(friend){
				let diffScore = compareUsers(that.user, friend);
				if (diffScore <= score){// && user != friend){
					score = diffScore;
					that.match = friend;
				}
			});
			console.log("match found:", that.match);
			if (callback){
				callback(that.match, that.res);
			}
			return that.match;
		}
				// if (data !== ""){
		this.sayHello = function (string){
			if (!string){
				return console.log(`Hi! My name is ${that.name}.`);
			}
			return console.log(`I'm ${that.name}, and I just wanted to say, ${string}.`);
		}		
	}// end of User constructor		
		




	function processUserData (req, res, callback){
		let jsonUserObj = req.body;
		if (isValid(jsonUserObj)){
			newUser = new User(jsonUserObj, res);
			newUser.sayHello("Howdy");
			newUser.writeToFile(newUser.findMatch, callback);

			// let match = findMatch(jsonUserObj);
			// writeToFile(jsonUserObj);
			
			return;// callback(res, match);

		}else{
			return console.log("Invalid or incomplete submission. Please correct and retry.");
		}
	}

	function isValid (jsonUserObj){
		for (prop in jsonUserObj){
			if (!jsonUserObj[prop]){
				console.log(`isValid(${jsonUserObj}[${prop}]) = false`);
				return false;
			}
		}
		return true;
	}	

	function compareUsers (user1, user2){
		let u1 = user1.scores, u2 = user2.scores;
		let diffArray = [];
		u1.forEach(function(score, i){
			diffArray.push(Math.abs(u1[i] - u2[i]));
		});
		let diffScore = diffArray.reduce((n, sum) => sum + n);
		return diffScore;

	}

	function sendMatch (match, res){
		res.header("Content-Type", "application/json");
		return res.json(JSON.stringify(match));
	}

	return {
		User: User,
		processUserData: processUserData,
		sendMatch: sendMatch,
	};
})();

// const newUser = new FriendFinder.User({name: "George Costanza", photo: "https://vignette.wikia.nocookie.net/seinfeld/image…ge-costanza.jpg/revision/latest?cb=20110406222711", scores: [2]});
// newUser.sayHello("you suck");

module.exports = FriendFinder;