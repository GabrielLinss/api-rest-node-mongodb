const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

require('./routes/routes')(app);
require('./routes/projectRoutes')(app);

app.listen(process.env.PORT);
console.log('Listening on port ', process.env.PORT);