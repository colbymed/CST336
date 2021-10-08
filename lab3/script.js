$("#Submit").on("click", checkAnswers);
var question3Options= [43,64,35,21];
var question4Options= [25,5,7.5,-5];
var points = 0;
var attempts = localStorage.getItem("attempts");
function checkAnswers() {
  attempts++;
  $("#attempts").html(`Attempts: ${attempts}`);
  localStorage.setItem("attempts", attempts);
  let answer1 = $("#question1").val();
  if (answer1 == 6) {
    points += 20;
    $("#q1").css("color", "green");
    $("#feedback1").html(" &check;");
  }
  else {
    $("#q1").css("color", "red");
    $("#feedback1").html(" &cross;");
  }
  let answer2 = $("#question2").val();
  if (answer2 == 2) {
    points += 20;
    $("#q2").css("color", "green");
    $("#feedback2").html(" &check;");
  }
  else {
    $("#q2").css("color", "red");
    $("#feedback2").html(" &cross;");
  }
  let answer3 = $("input[name=question3]:checked").val();
  if (answer3 == 64) {
    points += 20;
    $("#q3").css("color", "green");
    $("#feedback3").html(" &check;");
  }
  else {
    $("#q3").css("color", "red");
    $("#feedback3").html(" &cross;");
  }
  if (($("#question4correct1").prop("checked")) && ($("#question4correct2").prop("checked")) && !($("#question4incorrect1").prop("checked")) && !($("#question4incorrect2").prop("checked"))) {
    points += 20;
    $("#q4").css("color", "green");
    $("#feedback4").html(" &check;");
  }
  else{
    $("#q4").css("color", "red");
    $("#feedback4").html(" &cross;");
  }
  let answer5 = $("#question5").val();
  if (answer5 == 3628800) {
    points += 20;
    $("#q5").css("color", "green");
    $("#feedback5").html(" &check;");
  }
  else {
    $("#q5").css("color", "red");
    $("#feedback5").html(" &cross;");
  }
  $("#score").html(`Score: ${points}`);
  
  if (points >= 80) {
    $("#congratulations").html("Congratulations!!!!!!!!!!!!!!!!!!!!!!!!!!! <br>&#128515;&#128077;")
  }
  else {
    $("#congratulations").html("");
  }
  points = 0;
}

function randomizeRadioButtons() {
  question3Options= _.shuffle(question3Options);
  for (i = 0; i < question3Options.length; i++ ) {
    document.querySelector("#question3").innerHTML += `<input class='form-check-input' type='radio' name='question3' value='${question3Options[i]}'> ${question3Options[i]} `;
  }
}
function randomizeCheckBoxes() {
  question4Options= _.shuffle(question4Options);
  for (i = 0; i < question4Options.length; i++ ) {
    if(question4Options[i] == -5){
      document.querySelector("#question4").innerHTML += `<input class='form-check-input' type='checkBox' name='question4' id='question4correct2' value='${question4Options[i]}'> ${question4Options[i]} `;
    }
    else if(question4Options[i] == 5){
      document.querySelector("#question4").innerHTML += `<input class='form-check-input' type='checkBox' name='question4' id='question4correct1' value='${question4Options[i]}'> ${question4Options[i]} `;
    }
    else if(question4Options[i] == 7.5){
      document.querySelector("#question4").innerHTML += `<input class='form-check-input' type='checkBox' name='question4' id='question4incorrect2' value='${question4Options[i]}'> ${question4Options[i]} `;
    }
    else if(question4Options[i] == 25){
      document.querySelector("#question4").innerHTML += `<input class='form-check-input' type='checkBox' name='question4' id='question4incorrect1' value='${question4Options[i]}'> ${question4Options[i]} `;
    }
  }
}
randomizeRadioButtons();
randomizeCheckBoxes();

