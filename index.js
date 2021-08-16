const express = require('express');
const app = express();
require('./db');
const bodyParser = require('body-parser')
const cors = require('cors')

const corsOptions = {
  origin: "*",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}



// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get('/api/v1', function (req, res) {
  res.status(200).send('API v1 running');
});


const userController = require('./controllers/userController');
app.use('/api/v1/users', userController);

const authController = require('./controllers/authController');
app.use('/api/v1/authentication', authController);


app.listen(process.env.PORT || 4000, () => {
  console.log("listening to port ", process.env.PORT || 4000)
});


