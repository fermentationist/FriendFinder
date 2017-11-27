console.log("FriendMatch.js loaded.");
const FriendMatchModule = (function(){
	const path = require("path");
	const fs = require("fs");
	const bodyParser = require("body-parser");

	function processUserData (req, res){
		console.log("processUserData called.");
		let user = req.body;
		console.log('user', user);
		if (isValid(user)){
			let match = findMatch(user);
			writeToFile(user);
			console.log("returning match", match);
			return match;

		}else{
			return alert("Invalid or incomplete submission. Please correct and retry.");
		}
	}

	function isValid (formInputObj){
		for (prop in formInputObj){
			if (!formInputObj[prop]){
				return false;
			}
		}
		return true;
	}	

	function writeToFile (obj){
		let filePath = path.join(__dirname, "./friends.js");
		let newData;
		fs.readFile(filePath, "utf8", function (error, data){
			if (error){
				throw error.stack;
			}
			if (data !== ""){
				data = data.slice(1, data.length - 1);
				newData = `[${data},${JSON.stringify(obj)}]`;
			}else{
				newData = `[${JSON.stringify(obj)}]`;
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

	function findMatch (user){
		return user;
	}

	return {processUserData: processUserData};
})();

module.exports = FriendMatchModule;