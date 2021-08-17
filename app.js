const express = require("express");
const app = express();
const https = require("https");

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const cityName = req.body.cityName;
    const idKey = "1b77813c0f97e071c28aaca965d88846";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+ idKey +"&units="+ units;
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description;
            const weathertemp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const image = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

            res.write("<h1>The weather in "+ cityName +" is currently " + description + "</h1>");
            res.write("<p>The temperature in "+ cityName +" is " + weathertemp + " degrees Celcius.</p>");
            res.write("<img src=" + image + ">");
            res.send();
        });
    });
 });


app.listen(5000, function() {
    console.log("Server is running on port 5000.");
});