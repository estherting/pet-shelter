const express = require('express');
const app = express();
var path = require("path");
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/client/dist/client"));
app.use(bodyParser.json());   // IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!


require('./server/config/routes.js')(app);

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/client/index.html"))
});

app.listen(8000, function() {
 console.log("listening on port 8000");
});
