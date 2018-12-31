const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

require('./routes/routes')(app);
require('./routes/projectRoutes')(app);

app.listen(8000);
console.log('Listening on port 8000');