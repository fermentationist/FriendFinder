const FriendMatchModule = (function(){	
	const path = require("path");
	const fs = require("fs");
	const bodyParser = require("body-parser");

	function processUserData (req, res){
		let user = req.body;
		let keys = Object.keys(user);
		let reordered = {
			name: user.name,
			photo: user.photo
		};
		let scoreArray = [];
		for (prop in user){
			if (prop.slice(0,1) === "q"){
				scoreArray.push(parseInt(user[prop]));
			}
		}
		reordered.scores = scoreArray;
		user = reordered;
		console.log('user', user);
		//changes to object...
		//

		if (isValid(user)){
			let match = findMatch(user);
			writeToFile(user);
			showMatchModal(match);

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

	function showMatchModal (match){
		//show modal
		return;
	}

	return {processUserData: processUserData};
})();

module.exports = FriendMatchModule;