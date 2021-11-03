const express = require('express');
const app = express();
const faker = require("faker");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("home");
});
app.get('/linkedlist', (req, res) => {
    res.render("linkedlist", {title : "Linked List", image : "img/linkedlist.png"});
});
app.get('/queue', (req, res) => {
    res.render("queue", {title : "Queue", image : "img/queue.png", data : makeData()});
});
app.get('/stack', (req, res) => {
    res.render("stack", {title : "Stack", image : "img/stack.png", data : makeData()});
});
app.listen(3000, () => {
    console.log('server started');
});

function makeData() {
    nums = []
    for (i = 0; i < 5; i++) {
        nums.push(faker.datatype.number());
    }
    return nums;
}