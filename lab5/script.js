$("#searchBtn").on("click",imageSearch);
document.querySelector("#keyword").addEventListener("click", clearValidation);
randomBackgroundPic();
async function imageSearch() {
  let q = $("#keyword").val();
  if (q.length >= 3) {
    $("#images").html("");
    let orientation = $("#orientation").val();
    let url = `https://pixabay.com/api/?key=23607429-c3b40344e711cffe21d24acf7&q=${q}&orientation=${orientation}`;
    let data = await fetchData(url);
    data.hits = _.shuffle(data.hits);
    
    for (i = 0; i < 5; i++) {
      $("#images").append(
        `<figure class="card">
          <figcaption> Likes: ${data.hits[i].likes}</figcaption>
          <img src='${data.hits[i].webformatURL}' width="200px">
        </figure>`);
    }
  } else {
    if(q == ""){
    $("#validateSearch").html(" Type a keyword.");
  }
  else{
    $("#validateSearch").html(" Keyword must be three character long");
  }
  }
  
  
}

async function randomBackgroundPic(){
  let data = null;
  let listOfKeyWords = ["house", "sun", "forest", "nature", "car"];

  listOfKeyWords = _.shuffle(listOfKeyWords);

  let url = `https://pixabay.com/api/?key=23607429-c3b40344e711cffe21d24acf7&q=${listOfKeyWords[0]}`;
  console.log(url);
  data = await fetchData(url);
  data.hits = _.shuffle(data.hits);
  
  document.body.style.backgroundImage = `url('${data.hits[0].largeImageURL}')`;

}
function clearValidation(){
  $("#validateSearch").html("");
}

async function fetchData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
} 

