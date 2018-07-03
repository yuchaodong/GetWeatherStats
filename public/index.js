import Axios from "axios";

// Using Javascript and any frameworks/libraries you’d like,
// make a request to a free API, then format and display the resulting data on a page.  
// A simple set of Javascript and HTML files is acceptable,
// but feel free to show off your skills by adding your own features if time allows.
// Please use your best judgement for any open questions.
// There are no right/wrong ways to implement this.
// Your solution should be provided as a link to a github repository
// with a README on how to get it up and running.

// OpenWeatherMap
// https://openweathermap.org/api
// Simple free API for retrieving weather information.

// Frontend logic requirements:
// Implement data tracker class that keeps track of min, max, mean, and mode values.
// insert(value) - Records a new value into the tracker
// showMin() - Show the minimum value from the recorded tracker values
// showMax() - Show the maximum value from the recorded tracker values
// showMean() - Show the mean value from the recorded tracker values
// showMode() - Show the mode value from the recorded tracker values

// Call 16-day forecast on the target city (with cnt=16 GET parameter) 
// and create following different data tracker objects from above data tracker class:
// Day temperature

// Night temperature

// Morning temperature

// Humidity

// Render these data tracker objects into a separate UI section called statistics


// axios.get('https://httpbin.org/uuid')
//   .then(function(response){
//     console.log(response.data);
//     console.log(response.status);
//   });


const API_KEY = '446bc4479be13856e4628226251f3d58'
const endpoint = `https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${API_KEY}`

axios.get(endpoint)
  .then(function(response){
    console.log(response.data);
    console.log(response.status);
  });

// const sixteenDayForecast = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city name},${country code}&cnt=16`

const fiveDayForecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=${API_KEY}`

// https://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=446bc4479be13856e4628226251f3d58


// api.openweathermap.org/data/2.5/forecast?q={city name},{country code}

// axios.get(fiveDayForecastEndpoint)
//   .then(function(response){
//     console.log(response.data);
//     console.log(response.status);
//   })


class WeatherStats {
    constructor() {
      this.temps = {};
      this.min = null;
      this.max = null;
      this.mode = null;
      this.count = 0;
      this.sum = 0;
    }

    showMin() { 
      return this.min;
    }

    showMax() {
      return this.max;
    }

    showMean() {
      return this.sum / this.count;
    }

    showMode() {
      let currMode = null;
      let currModeTemp = null;
      for (let temp in this.temps) {
        if (currMode === null || currMode < this.temps[temp]) {
          currMode = this.temps[temp];
          currModeTemp = temp;
        }
      }
      return currModeTemp;
    }

    insert(val) {
      let roundedVal = Math.round(val);
      this.count++;
      this.sum += roundedVal;
      if (this.min === null || roundedVal < this.min) {
        this.min = roundedVal;
      }
      if (this.max === null || roundedVal > this.max) {
        this.max = roundedVal;
      }
      this.temps[roundedVal] = this.temps[roundedVal] ? this.temps[roundedVal] + 1 : 1;
    }
}

let classMemory = {
  WeatherStats
}

let init = function() {
  // let displayMinVal = document.getElementById('displayMin');
  let min = document.getElementById("displayMin")
  let option = document.createElement("option")
  option.value = WeatherStats.constructor
  option.text = WeatherStats.showMin
  min.addEventListener(option)
  // displayMinVal.value = WeatherStats.showMin;
}

let fiveDayForecast = new WeatherStats();

// dayTemp (9am - 6pm)
fiveDayForecast.dayTemp = function(val) {
  let min = null;
  let max = null;
  let weatherData = sampleWeatherData.list;
  for (let i = 0; i < weatherData.length; i++) {
    let timeStamp = weatherData[i].dt_txt;
    let time = timeStamp.slice(11, 13);
    if (time >= 09 && time <= 18) {
      let currTempConvertedToF = (9 / 5 * (weatherData[i].main.temp - 273) + 32);
      if (currTempConvertedToF < min || min === null) {
        min = Math.round(currTempConvertedToF);
      }
      if (currTempConvertedToF > max || max === null) {
        max = Math.round(currTempConvertedToF);
      }
    }
  }
  return `Day temperatures were from ${min} to ${max} degrees Fahrenheit.`;
}

// nightTemp (9pm)
fiveDayForecast.nightTemp = function(val) {
  let min = null;
  let max = null;
  let weatherData = sampleWeatherData.list;
  for (let i = 0; i < weatherData.length; i++) {
    let timeStamp = weatherData[i].dt_txt;
    let time = timeStamp.slice(11, 13);
    if (time = 21) {
      let currTempConvertedToF = (9 / 5 * (weatherData[i].main.temp - 273) + 32);
      if (currTempConvertedToF < min || min === null) {
        min = Math.round(currTempConvertedToF);
      }
      if (currTempConvertedToF > max || max === null) {
        max = Math.round(currTempConvertedToF);
      }
    }
  }
  return `Night temperatures were from ${min} to ${max} degrees Fahrenheit.`;
}

// morningTemp (6am - 9am)
fiveDayForecast.morningTemp = function(val) {
  let min = null;
  let max = null;
  let weatherData = sampleWeatherData.list;
  for (let i = 0; i < weatherData.length; i++) {
    let timeStamp = weatherData[i].dt_txt;
    let time = timeStamp.slice(11, 13);
    if (time >= 06 && time <= 09) {
      let currTempConvertedToF = (9 / 5 * (weatherData[i].main.temp - 273) + 32);
      if (currTempConvertedToF < min || min === null) {
        min = Math.round(currTempConvertedToF);
      }
      if (currTempConvertedToF > max || max === null) {
        max = Math.round(currTempConvertedToF);
      }
    }
  }
  return `Morning temperatures were from ${min} to ${max} degrees Fahrenheit.`;
}

// humidity (avg humidity for the day)
fiveDayForecast.humidity = function(val) {
  let totalHumidity = 0;
  let weatherData = sampleWeatherData.list;
  for (let i = 0; i < weatherData.length; i++) {
      totalHumidity += weatherData[i].main.humidity;
    }
  let humidity = totalHumidity / weatherData.length;
  return `Average humidity is ${humidity}`;
}

const displayMin = new classMemory[document.getElementById('displayMin').value]
// const displayMax
// const displayMean
// const displayMode