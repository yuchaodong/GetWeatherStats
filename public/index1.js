
class DataTracker {
  constructor() {
    this.values = {};
    this.min = null;
    this.max = null;
    this.mode = null;
    this.count = 0;
    this.sum = 0;
  }

  showMin() { 
    return this.min.toFixed(1);
  }

  showMax() {
    return this.max.toFixed(1);
  }

  showMean() {
    return (this.sum / this.count).toFixed(1);
  }

  showMode() {
    let currMode = null;
    for (let value in this.values) {
      if (currMode === null || this.values[value] > this.values[currMode]) {
        currMode = value;
      }
    }
    return currMode;
  }

  insert(value) {
    this.count++;
    this.sum += value;

    if (this.min === null || value < this.min) {
      this.min = value;
    }
    if (this.max === null || value > this.max) {
      this.max = value;
    }

    let roundedVal = Math.round(value);
    this.values[roundedVal] = this.values[roundedVal] ? this.values[roundedVal] + 1 : 1;
  }
}

function testingClickhandler() {
  const testButton = document.getElementById('testButton2')

  testButton.addEventListener('click', function () {
    const testText = document.getElementById('testText3')
    testText.innerHTML = 111;
  
    // testText3.innerHTML = 234
    console.log(111)
  })  
}

function testEndpoint() {
  const cityName = 'london';
  const countryCode = 'uk';
  const API_KEY = 'e0b20ff2b6955b76e9e552fb8e239e68';
  const BASE_API_URL = 'http://api.openweathermap.org/data/2.5'
  const FORECAST_ENDPOINT = '/forecast/daily'
  const queryString = `?cnt=16&APPID=${API_KEY}&q=${cityName},${countryCode}`
  const endpoint = BASE_API_URL + FORECAST_ENDPOINT + queryString
  axios.get(endpoint).then(function (data) {
    console.log(data)
  })
}

function getForecast2(cityName, countryCode) {
  return new Promise(function (resolve) {
    const API_KEY = 'e0b20ff2b6955b76e9e552fb8e239e68';
    const BASE_API_URL = 'http://api.openweathermap.org/data/2.5'
    const FORECAST_ENDPOINT = '/forecast/daily'
    const queryString = `?cnt=16&APPID=${API_KEY}&q=${cityName},${countryCode}`
    const endpoint = BASE_API_URL + FORECAST_ENDPOINT + queryString
    axios.get(endpoint).then(function (data) {
      resolve(data)
    })
  })
}

function getForecast(cityName, countryCode) {
  const API_KEY = 'e0b20ff2b6955b76e9e552fb8e239e68';
  const BASE_API_URL = 'http://api.openweathermap.org/data/2.5'
  const FORECAST_ENDPOINT = '/forecast/daily'
  const queryString = `?cnt=16&APPID=${API_KEY}&q=${cityName},${countryCode}`
  const endpoint = BASE_API_URL + FORECAST_ENDPOINT + queryString
  return axios.get(endpoint)
}


function testTracker () {
  // insert forecast for humidity
  // show stats
  getForecast('london', 'uk').then(function (data) {
    console.log(data)
    console.log(data.list.humidity)
  })
}


// testingClickhandler()
// testEndpoint()
testTracker()
