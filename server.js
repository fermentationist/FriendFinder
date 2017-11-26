//====================//Dependencies//====================//
const express = require("express");
const bodyParser = require("body-parser");

//instantiate express
const app = express();

//====================//Global Variables//====================//
const PORT = process.env.PORT || 8080;

//====================//Middleware//====================//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static("app/public"));
//express.static used to serve assets
// //====================//Middleware router for HTML files//====================//
// app.use(express.static("app/public/", {extensions: ["html"]}));

//====================//Routing//====================//

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


//====================//Listener//====================//
app.listen(PORT, function(){
	console.log("Listening on port", PORT);
})