var router = require('express').Router();
//var request = require('request');
var express  = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var apiKey = 'cff7da7d2efa98aaf90c4d6be91a6153';


//router.use(bodyParser.json());
router.get('/', function(req, res){
  console.log("Homepage loaded!");
    res.render('homepage');
});

router.post('/displayDetails', function(req, res){

  //here we will define city and url
  var city = req.body.CityInput;
  console.log(city);
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
request(url, function(err, response, body){
  if(err) {console.log('error : ', error);
res.render('errorpage');
}
  else {
    //if(response.statusCode==404){}
    //console.log('Error');

    //else {
      var weather = JSON.parse(body);
      //console.log(`The temperature is ${weather.main.temp} Kelvin`);
      console.log(weather);
      if(response.statusCode==404){
        console.log('Not Found');
        res.render('errorpage');

      }
      else{
      var temp = weather.main.temp;

      res.render('result', {temp : temp});
}
  }

});

});

module.exports = router;
