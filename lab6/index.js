const express = require('express');
const fetch = require("node-fetch");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
   res.render("home");
});
app.get('/earth', (req, res) => {
   res.render("earth");
});
app.get('/venus', (req, res) => {
   res.render("venus");
});
app.get('/mars', (req, res) => {
   res.render("mars");
});
app.get('/mercury', (req, res) => {
   res.render("mercury");
});
app.get('/picOfTheDay', async(req, res) => {
  let date = new Date().toISOString();
  let dateString = date.substring(0,10);
  let url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${dateString}`;
  let data = await fetchData(url);
  let title = data.title;
  let image = data.hdurl;
  let description = data.explanation;
   res.render("picOfTheDay", {"image": image, "description" : description, "title" : title});
});
app.listen(3000, () => {
   console.log('server started');
});

async function fetchData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}