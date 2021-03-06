
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
  const BASE_API_URL = 'http://api.openweathermap.org/data/2.5'
  const FORECAST_ENDPOINT = '/forecast/daily'
  const queryString = `?cnt=16&APPID=${API_KEY}&q=${cityName},${countryCode}`
  const endpoint = BASE_API_URL + FORECAST_ENDPOINT + queryString
  axios.get(endpoint).then(function (data) {
    console.log(data)
  })
}

function promisedForecast(cityName, countryCode) {
  const BASE_API_URL = 'http://api.openweathermap.org/data/2.5'
  const FORECAST_ENDPOINT = '/forecast/daily'
  const queryString = `?cnt=16&APPID=${API_KEY}&q=${cityName},${countryCode}`
  const endpoint = BASE_API_URL + FORECAST_ENDPOINT + queryString
  return axios.get(endpoint)
}

function testUsingTracker() {
  let testing = new DataTracker();
  testing.insert(7)
  testing.insert(8)
  testing.insert(9)
  console.log(testing.showMean());
}

function testTracker () {
  const humidityTracker = new DataTracker();
  promisedForecast('london', 'uk').then(function (data) {
    for (let dayData of data.data.list) {
      humidityTracker.insert(dayData.humidity)
    }
    console.log('humidity mean:', humidityTracker.showMean());
  })
}

function promisedHumidityMean (cityName, countryCode) {
  const humidityTracker = new DataTracker();
  return promisedForecast(cityName, countryCode).then(function (data) {
    for (let dayData of data.data.list) {
      humidityTracker.insert(dayData.humidity)
    }
    return humidityTracker.showMean();
  })
}

function testButtonToForecast () {
  const testButton = document.getElementById('testButton2');
  testButton.addEventListener('click', function () {
    promisedHumidityMean('london', 'uk')
      .then(function (data) {
        let testText = document.getElementById('testText3');
        testText.innerHTML = data;
      })
  })
}

function testParamsForStats () {
  const cityName = 'seattle';
  const countryCode = 'us';
  promisedHumidityMean(cityName, countryCode).then(function (humidityMean) {
    console.log(humidityMean)
  })
}

function testInput () {
  const submitButton = document.getElementById('submitButton');
  const cityInput = document.getElementById('cityInput');
  submitButton.addEventListener('click', function () {
    console.log('city name', cityInput.value)    
  })
}

function testInputForStats () {
  const submitButton = document.getElementById('submitButton');
  const cityInput = document.getElementById('cityInput');
  const countryInput = document.getElementById('countryInput');
  const testText = document.getElementById('testText3')
  submitButton.addEventListener('click', function () {
    promisedHumidityMean(cityInput.value, countryInput.value).then(function (humidityMean) {
      testText.innerHTML = humidityMean;
    })
  })
}

function promisedWeatherStats (cityName, countryCode) {
  const humidityTracker = new DataTracker();
  const morningTracker = new DataTracker();
  const dayTracker = new DataTracker();
  const nightTracker = new DataTracker();

  return promisedForecast(cityName, countryCode).then(function (data) {
    for (let dayData of data.data.list) {
      humidityTracker.insert(dayData.humidity)
      morningTracker.insert(dayData.temp.morn)
      dayTracker.insert(dayData.temp.day)
      nightTracker.insert(dayData.temp.night)
    }
    return {
      'morning': {
        'min': morningTracker.showMin(), 
        'max': morningTracker.showMax(),
        'mean': morningTracker.showMean(),
        'mode': morningTracker.showMode()   
      },
      'day': {
        'min': dayTracker.showMin(), 
        'max': dayTracker.showMax(),
        'mean': dayTracker.showMean(),
        'mode': dayTracker.showMode()   
      },
      'night': {
        'min':  nightTracker.showMin(), 
        'max':  nightTracker.showMax(),
        'mean':  nightTracker.showMean(),
        'mode':  nightTracker.showMode()   
      },
      'humidity': {
        'min': humidityTracker.showMin(), 
        'max': humidityTracker.showMax(),
        'mean': humidityTracker.showMean(),
        'mode': humidityTracker.showMode()
      }
    }
  })
}

function testTables () {
  const table = document.getElementById('statsTable');
  const row = table.insertRow();
  const cell1 = row.insertCell();
  const cell2 = row.insertCell();
  row.insertCell().innerHTML = 'test3';
  cell1.innerHTML = 'test'
  cell2.innerHTML = 'test2'
}

function testGeneratingTable () {
  const table = document.getElementById('statsTable');

  for (let i = 0; i < 5; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 5; j++) {
      row.insertCell().innerHTML = [i, j];
    }
  }
}

function testFillTable () {
  promisedWeatherStats('seattle', 'us').then(function (weatherData) {  
    const dataMatrix = generateWeatherDataMatrix(weatherData)
    fillTable(dataMatrix)
  })
}

// testingClickhandler()
// testEndpoint()
// testTracker()
//  testUsingTracker()
// testButtonToForecast()
// testParamsForStats()
// testInput()
// testInputForStats()
// testTables()
testGeneratingTable()