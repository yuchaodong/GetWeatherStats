const express = require('express');
const process = require('process');
const app = express();
const ROOT = require('app-root-path');

const publicFolder = ROOT + '/public';

// console.log('publicFolder', publicFolder)

app.use(express.static(publicFolder));
app.listen(3000, () => console.log('listening to port 3000!'));