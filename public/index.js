
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

function promisedForecast(cityName, countryCode) {
  const BASE_API_URL = 'http://api.openweathermap.org/data/2.5'
  const FORECAST_ENDPOINT = '/forecast/daily'
  const queryString = `?cnt=16&APPID=${API_KEY}&q=${cityName},${countryCode}`
  const endpoint = BASE_API_URL + FORECAST_ENDPOINT + queryString
  return axios.get(endpoint)
}


function promisedWeatherStats (cityName, countryCode) {
  const humidityTracker = new DataTracker();
  const dayTracker = new DataTracker();
  return promisedForecast(cityName, countryCode).then(function (data) {
    for (let dayData of data.data.list) {
      humidityTracker.insert(dayData.humidity)
      console.log(dayData.temp.day)
      // dayTracker.insert(dayData.)
    }
    return {
      'min': humidityTracker.showMin(),
      'max': humidityTracker.showMax(),
      'mean': humidityTracker.showMean(),
      'mode': humidityTracker.showMode()
    }
  })
}


function testStatsFormat() {
  promisedWeatherStats('seattle', 'us').then(function (stats) {
    console.log(stats)
  })
}


testStatsFormat()