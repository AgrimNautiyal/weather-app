var router = require('express').Router();
var request = require('request');
require('dotenv').config();
var apiKey = process.env.API_KEY;

router.get('/', function(req, res){
  console.log("Homepage loaded!");
    res.render('homepage');
});

router.post('/displayDetails', function(req, res){

  //here we will define city and url
  var city = req.body.CityInput;
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
request(url, function(err, response, body){
  if(err) {console.log('error : ', error);
res.render('errorpage');
}
  else {
      var weather = JSON.parse(body);
      console.log(weather);
      if(response.statusCode==404){//this block evaluates conditions when city name doesn't exist in API's DB
        console.log('Not Found');
        res.render('errorpage');


      }
      else{
      var temp = weather.main.temp; //degree celsius
      var humidity = weather.main.humidity; //percent
      var pressure = weather.main.pressure; //hectopascals
      var wind_speed = weather.wind.speed; //m/s
      var wind_direction = weather.wind.deg;

      res.render('result', {city:city, temp : temp, humidity:humidity, pressure:pressure, wind_speed:wind_speed, wind_direction:wind_direction});
}
  }

});

});

module.exports = router;
