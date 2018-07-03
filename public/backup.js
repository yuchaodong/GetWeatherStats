
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


function testClickHandlerAndUpdateElem() {
  const testDisplay = document.getElementById('testDisplay');
  const testButton = document.getElementById('testButton');
  //testButton.addEventListener('click', (e) => {
  //  testDisplay.innerHTML = 123
  //})
  testButton.onclick = (e) => {
    testDisplay.innerHTML = 456
  }
}

function testEndpoint() {
  //const stats = new DataTracker()

  //const API_KEY = '446bc4479be13856e4628226251f3d58'
  const API_KEY = 'e0b20ff2b6955b76e9e552fb8e239e68'
  const city = 'london'
  const country = 'uk'
  const BASE_URL = 'https://api.openweathermap.org'
  const forecastEndpoint = '/data/2.5/forecast/daily'
  const query = `?cnt=16&units=imperial&q=${city},${country}&APPID=${API_KEY}`
  const endpoint = BASE_URL + forecastEndpoint + query

  axios.get(endpoint)
    .then(function(response){
      console.log(response)
      //for (let dayData of response.data.list) {
      //  console.log(dayData.humidity)
      //  stats.insert(dayData.humidity)
      //}
      //console.log('STATS')
      //console.log('min:', stats.showMin())
      //console.log('max:', stats.showMax())
      //console.log('mean:', stats.showMean())
      //console.log('mode:', stats.showMode())
    });
}
function testTracker() {
  const tracker = new DataTracker()

  const API_KEY = 'e0b20ff2b6955b76e9e552fb8e239e68'
  const city = 'london'
  const country = 'uk'
  const BASE_URL = 'https://api.openweathermap.org'
  const forecastEndpoint = '/data/2.5/forecast/daily'
  const query = `?cnt=16&units=imperial&q=${city},${country}&APPID=${API_KEY}`
  const endpoint = BASE_URL + forecastEndpoint + query

  axios.get(endpoint)
    .then(function(response){
      for (let dayData of response.data.list) {
        console.log(dayData.humidity)
        tracker.insert(dayData.humidity)
      }
      console.log('STATS')
      console.log('min:', tracker.showMin())
      console.log('max:', tracker.showMax())
      console.log('mean:', tracker.showMean())
      console.log('mode:', tracker.showMode())
    });
}

function testMultipleTrackers() {
  const humidityTracker = new DataTracker()
  const mornTemperatureTracker = new DataTracker()
  const dayTemperatureTracker = new DataTracker()
  const nightTemperatureTracker = new DataTracker()

  const API_KEY = 'e0b20ff2b6955b76e9e552fb8e239e68'
  const city = 'london'
  const country = 'uk'
  const BASE_URL = 'https://api.openweathermap.org'
  const forecastEndpoint = '/data/2.5/forecast/daily'
  const query = `?cnt=16&units=imperial&q=${city},${country}&APPID=${API_KEY}`
  const endpoint = BASE_URL + forecastEndpoint + query

  axios.get(endpoint)
    .then(function(response){
      for (let dayData of response.data.list) {
        humidityTracker.insert(dayData.humidity)
        mornTemperatureTracker.insert(dayData.temp.morn)
        dayTemperatureTracker.insert(dayData.temp.day)
        nightTemperatureTracker.insert(dayData.temp.night)
      }

      // print stats
      console.log('\nHUMIDITY')
      console.log('min:', humidityTracker.showMin())
      console.log('max:', humidityTracker.showMax())
      console.log('mean:', humidityTracker.showMean())
      console.log('mode:', humidityTracker.showMode())
      console.log('\nMORN')
      console.log('min:', mornTemperatureTracker.showMin())
      console.log('max:', mornTemperatureTracker.showMax())
      console.log('mean:', mornTemperatureTracker.showMean())
      console.log('mode:', mornTemperatureTracker.showMode())
      console.log('\nDAY')
      console.log('min:', dayTemperatureTracker.showMin())
      console.log('max:', dayTemperatureTracker.showMax())
      console.log('mean:', dayTemperatureTracker.showMean())
      console.log('mode:', dayTemperatureTracker.showMode())
      console.log('\nNIGHT')
      console.log('min:', nightTemperatureTracker.showMin())
      console.log('max:', nightTemperatureTracker.showMax())
      console.log('mean:', nightTemperatureTracker.showMean())
      console.log('mode:', nightTemperatureTracker.showMode())
    });
}

function testTrackersWithCityCountry(city, country) {
  const humidityTracker = new DataTracker()
  const mornTemperatureTracker = new DataTracker()
  const dayTemperatureTracker = new DataTracker()
  const nightTemperatureTracker = new DataTracker()

  const API_KEY = 'e0b20ff2b6955b76e9e552fb8e239e68'
  const BASE_URL = 'https://api.openweathermap.org'
  const forecastEndpoint = '/data/2.5/forecast/daily'
  const query = `?cnt=16&units=imperial&q=${city},${country}&APPID=${API_KEY}`
  const endpoint = BASE_URL + forecastEndpoint + query

  axios.get(endpoint)
    .then(function(response){
      for (let dayData of response.data.list) {
        humidityTracker.insert(dayData.humidity)
        mornTemperatureTracker.insert(dayData.temp.morn)
        dayTemperatureTracker.insert(dayData.temp.day)
        nightTemperatureTracker.insert(dayData.temp.night)
      }

      // print stats
      console.log('\nHUMIDITY')
      console.log('min:', humidityTracker.showMin())
      console.log('max:', humidityTracker.showMax())
      console.log('mean:', humidityTracker.showMean())
      console.log('mode:', humidityTracker.showMode())
      console.log('\nMORN')
      console.log('min:', mornTemperatureTracker.showMin())
      console.log('max:', mornTemperatureTracker.showMax())
      console.log('mean:', mornTemperatureTracker.showMean())
      console.log('mode:', mornTemperatureTracker.showMode())
      console.log('\nDAY')
      console.log('min:', dayTemperatureTracker.showMin())
      console.log('max:', dayTemperatureTracker.showMax())
      console.log('mean:', dayTemperatureTracker.showMean())
      console.log('mode:', dayTemperatureTracker.showMode())
      console.log('\nNIGHT')
      console.log('min:', nightTemperatureTracker.showMin())
      console.log('max:', nightTemperatureTracker.showMax())
      console.log('mean:', nightTemperatureTracker.showMean())
      console.log('mode:', nightTemperatureTracker.showMode())
    });
}


//testClickHandlerAndUpdateElem()
//testEndpoint()
//testTracker()
// testMultipleTrackers()

// const city = 'seattle'
// const country = 'us'
// testTrackersWithCityCountry(city, country)



