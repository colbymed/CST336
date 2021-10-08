url = "https://itcdland.csumb.edu/~milara/ajax/videosAPI.php?videoId=zkjn5yyBmYc";
$("#like").on("click", like);
$("#dislike").on("click", dislike);
$("#commentButton").on("click", displayComments);
$("#questionButton").on("click", askQuestion);
$("#question").on("change", checkAnswer);
displayLikes();
var liked = false;
var disliked = false;
async function fetchData(url) {
  let response = await fetch(url);
  data = await response.json();
  return data;
}
async function displayLikes() {
  let data = await fetchData(url);
  $("#numLikes").html(`${data.likes}`);
  $("#numDislikes").html(`${data.dislikes}`);
}
async function like() {
  if (!liked) {
    let newUrl = url + "&action=like";
    let data = await fetchData(newUrl);
    displayLikes();
    liked = true;
    $("#likeImg").attr("src","img/like.png");
  } else {
    let newUrl = url + "&action=cancel_like";
    let data = await fetchData(newUrl);
    displayLikes();
    liked = false;
    $("#likeImg").attr("src","img/cancel_like.png");
  }
}
async function dislike() {
  if (!disliked) {
    let newUrl = url + "&action=dislike";
    let data = await fetchData(newUrl);
    displayLikes();
    disliked = true;
    $("#dislikeImg").attr("src","img/dislike.png");
  }
  else {
    let newUrl = url + "&action=cancel_dislike";
    let data = await fetchData(newUrl);
    displayLikes();
    disliked = false;
    $("#dislikeImg").attr("src","img/cancel_dislike.png");
  }
}
async function displayComments() {
  let newUrl = url + "&action=comments";
  let data = await fetchData(newUrl);
  data = _.shuffle(data);
  $("#newContent").html("");
  for (i = 0; i < data.length; i++) {
    $("#newContent").append(`
    <div>
      <strong>${data[i].author}</strong>
      <em>${data[i].date}</em>
      <br>
      ${data[i].comment}
      <br>
      `);
    for (j = 0; j < data[i].rating; j++) {
      $("#newContent").append("<img src='img/star.jpg'>");
    }
    $("#newContent").append("</div> <br><br>");
  }
}
function askQuestion() {
  $("#newContent").html(
    `<h1> What was the video about? &#129300;</h1>
    <select id="question"> 
      <option>Pick The Best Answer</option>
      <option>Halloween</option>
      <option>SF Giants</option>
      <option>CSU Monterey Bay</option>
      <option>Canada</option> 
    </select>
    <span id="result"></span>`);
}
function checkAnswer() {
  if ($("#question").val() == "SF Giants") {
    $("#result").html("<p>Congratulations! That is correct!");
  } else {
    $("#result").html("<p>Incorrect! Watch the video again!");
  }
}