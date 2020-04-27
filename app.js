const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})


app.post("/", function(req, res) {
  const cityName = req.body.cityName;
  const appID = "52797561ca1df1c360ba5908f0fbab90";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + appID + "&units=metric";
    https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temperute = weatherData.main.temp;
      if(temperute < 32){
        res.sendFile(__dirname + "/beachDay.html");
      }
      else{
        res.sendFile(__dirname + "/gobBeachDay.html");
      }
    });
  });
});

app.listen(3000, () => console.log("Listen to port 3000"));
