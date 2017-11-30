console.log("survey.js loaded.");

const SurveyModule = (function(){
	function displaySurvey (questionArray){
		questionArray.forEach(function(question, i){
			question = $("<h5>").text(question);
			let formGroup = $("<div>").attr("class", "form-group");
			let headingStr = "<h4><strong>Question " + (i + 1) + "</strong></h4>";
			let label = $("<label>").attr("for", ("q" + i)).html(headingStr);
			let select = $("<select required>").attr("name", ("q" + i)).attr("id", ("q" + i)).addClass("form-control");
			let optionDiv = options(select);
			formGroup.append(label).append(question).append(select);
			$("#surveyQuestions").append(formGroup);
		});
	}
	function options (selectElement) {
		let optionDiv = $("<div>");
		for (let i = 1; i <= 5; i ++){
			let option = $("<option>").attr("id", ("option" + i));
			option.val(i);
			if (i === 1){
				option.text(`${i}- strongly disagree`);
			}else if (i === 5){
				option.text(`${i}- strongly agree`);
			}else{
				option.text(i);
			}
			selectElement.append(option);
		}
		let placeholder = $("<option>").attr("selected", "selected").attr("disabled", "disabled").text("select an option").val("");
		selectElement.prepend(placeholder);
		return selectElement;
	}

	function showModal(match){
		$("#resultModal").modal("show");
		match = JSON.parse(match);
		console.log('match', match);
		$("#matchName").html("<h3>" + match.name + "</h3>");
		let photo = $("<img>").attr("src", match.photo);
		$("#matchPhoto").html(photo);
		$("#resultModal").on("hidden.bs.modal", function(){
			window.location = "/api/friends";
		});
	}

	function setFormListener(){
		$("#submit").on("click", function (event) {
		    console.log('event', event);
		    event.preventDefault();
		    let formData = {
		        name: $("#name").val().trim(),
		        photo: $("#photo").val().trim(),
		        scores: []
		    };
		    $(".form-control").each(function(){
		    	let id = $(this).attr("id");
		    	if (/q{1}\d+/.test(id)){
		    		(formData.scores).push(parseInt($(this).val()));
		    	}
		    });
		    let location = window.location.origin;
		    console.log('location', location);

		    $.ajax({
		            method:"POST",
		            url: location + "/api/friends",
		            data: JSON.stringify(formData),
		            contentType:"application/json",
		            // traditional: true,
		            success:function(data){
		                console.log("success",data);
		                return showModal(data);

		            },
		            error:function(req, status, error){
		                console.log(req,status,error);
		            }
		        });


			});
	}

	return {
		displaySurvey: displaySurvey,
		setFormListener: setFormListener
	};
})();

const questions = ["Cilantro is disgusting."];//, "Ketchup is an appropriate dressing for a hot dog, which is not, by the way, a sandwich.", "Religion is worse than nonsense.", "You think that everyone’s views should be respected regardless of whether they are supported by facts or not.", "The Beatles made a more original contribution to musical culture than the Rolling Stones."];
console.log("questions", questions);

SurveyModule.displaySurvey(questions);
SurveyModule.setFormListener();




