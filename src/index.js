const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./routes/routes')(app);
require('./routes/projectRoutes')(app);

app.listen(8000);