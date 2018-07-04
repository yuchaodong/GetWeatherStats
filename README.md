# Tivix
Tivix take-home challenge

Instructions:
To clone the repo, enter command (This is a private repo. For access, please ask for invite.): <br />
`git clone https://github.com/yuchaodong/tivix.git`

Before using, make sure you have the following dependencies installed: <br />
To install express, enter command: `npm install express`; <br />

To install axios, enter command: `npm install axios`; <br />

To install app-root-path, enter command: `npm install app-root-path`; <br />

To run the app, enter command: `node server/server.js`; <br />


About the app: <br />
This is a weather app that collects temperature data and generates statistics pertinent to temperatures (such as maximum and mininum temperatures, mode temperature, and average temperature).

How to use the app: <br />
The user enters a city name and country code for the city for which they would like to get info from. For example, for Sydney, Australia, they can enter 'sydney' for city name, and 'aus' for country code (it is not case-sensitve), then click submit for Sydney's weather data. The API tries its best with typos. For instance, if the user enters 'sydney' as city name, and 'au' as country code, the data for Sydney will show up. However, if the user enters 'a' as country code for 'sydney', a 404 error will appear. As a reminder, the temperatures are in degrees Fahrenheit.