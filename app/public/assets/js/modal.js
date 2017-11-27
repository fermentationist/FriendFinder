console.log("modal.js loaded.");
$("#resultModal").modal("toggle");
let match = localStorage.getItem("match");
match = JSON.parse(match);
console.log('match', match);
$("#matchName").html("<h3>" + match.name + "</h3>");
let photo = $("<img>").attr("src", match.photo);
$("#matchPhoto").html(photo);
$("#resultModal").on("hidden.bs.modal", function(){
	window.location = "/api/friends";
});
