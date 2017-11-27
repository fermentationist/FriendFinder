console.log("survey.js loaded.");
const SurveyModule = (function(){
	function displaySurvey (questionArray){
		questionArray.forEach(function(question, i){
			question = $("<h5>").text(question);
			let formGroup = $("<div>").attr("class", "form-group");
			let headingStr = "<h4><strong>Question " + (i + 1) + "</strong></h4>";
			let label = $("<label>").attr("for", ("q" + i)).html(headingStr);
			let select = $("<select required>").attr("name", ("q" + i));
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

	return {displaySurvey: displaySurvey};
})();
const questions = ["You think that everyone’s views should be respected regardless of whether they are supported by facts or not.", "In a discussion, truth should be more important than people’s sensitivities."];
console.log("questions", questions);
SurveyModule.displaySurvey(questions);

