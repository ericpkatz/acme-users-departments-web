const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3001;

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, ()=> console.log(`listening on port ${port}`));
