
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

function promisedWeatherStats (cityName, countryCode) {
  const trackers = {};
  const stats = ['morning', 'day', 'night', 'humidity'];
  stats.forEach((statsName) => {
    trackers[statsName] = new DataTracker();
  })

  return promisedForecast(cityName, countryCode).then(function (data) {
    for (let dayData of data.data.list) {
      trackers['humidity'].insert(dayData.humidity);
      trackers['morning'].insert(dayData.temp.morn);
      trackers['day'].insert(dayData.temp.day);
      trackers['night'].insert(dayData.temp.night);
    }

    const result = {}
    for (let trackerName in trackers) {
      tracker = trackers[trackerName];
      result[trackerName] = {
        'min': tracker.showMin(),
        'max': tracker.showMax(),
        'mean': tracker.showMean(),
        'mode': tracker.showMode()
      }
    }
    return result;
  })
}


function promisedForecast(cityName, countryCode) {
  const BASE_API_URL = 'http://api.openweathermap.org/data/2.5';
  const FORECAST_ENDPOINT = '/forecast/daily';
  const queryString = `?cnt=16&APPID=${API_KEY}&q=${cityName},${countryCode}&units=imperial`;
  const endpoint = BASE_API_URL + FORECAST_ENDPOINT + queryString;
  return axios.get(endpoint);
}


function generateWeatherDataMatrix(weatherData) {
  const statsRow = {
    'min': 1,
    'max': 2,
    'mean': 3,
    'mode': 4
  }
  const typeCol = {
    'morning' : 1,
    'day': 2,
    'night': 3,
    'humidity': 4
  }
  const nRows = Object.keys(statsRow).length + 1;
  const nCols = Object.keys(typeCol).length + 1;
  const dataMatrix = generateEmptyMatrix(nRows, nCols);

  for (let stat in statsRow) {
    const rowNumber = statsRow[stat];
    dataMatrix[rowNumber][0] = stat;
  }

  for (let type in typeCol) {
    const colNumber = typeCol[type];
    dataMatrix[0][colNumber] = type;
  }

  for (let typeName in weatherData) {
    stats = weatherData[typeName];
    for (let stat in stats) {
      const row = statsRow[stat];
      const col = typeCol[typeName];
      dataMatrix[row][col] = stats[stat];
    }
  }
  return dataMatrix;
}


function generateEmptyMatrix(nRows, nCols) {
  const matrix = [];
  for (let i = 0; i < nRows; i++) {
    const row = [];
    matrix.push(row);
    for (let j = 0; j < nCols; j++) {
      row.push(null);
    }
  }
  return matrix;
}


function fillTable(matrix) {
  const table = document.getElementById('statsTable');
  table.innerHTML = '';
  for (let i = 0; i < matrix.length; i++) {
    const row = table.insertRow();
    for (let j = 0; j < matrix[i].length; j++) {
      row.insertCell().innerHTML = matrix[i][j];
    }
  }
}


function init () {
  const submitButton = document.getElementById('submitButton');
  const cityInput = document.getElementById('cityInput');
  const countryInput = document.getElementById('countryInput');
  const resultText = document.getElementById('resultText');

  submitButton.addEventListener('click', function () {
    promisedWeatherStats(cityInput.value, countryInput.value)
      .then(function (weatherData) {
        resultText.innerHTML = `Humidity percentage and weather temperatures for ${cityInput.value} in degrees Fahrenheit`
        const dataMatrix = generateWeatherDataMatrix(weatherData);
        fillTable(dataMatrix);
      })
      .catch(function (error) {
        resultText.innerHTML = `${error}`;
      })
  })
}

init ()
