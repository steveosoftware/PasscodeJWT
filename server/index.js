const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const User = require('./models/user')
const cors = require('cors');

//DB Setup
mongoose.connect('mongodb://localhost:27017/authtest', { usedNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
  console.log('CONNECTION OPEN')
})
.catch(err => {
  console.log('OH NO ERROR!')
  console.log(err)
})

//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app)

//Server Setup
const port = process.env.PORT || 3090
const server = http.createServer(app);
server.listen(port);
console.log('server is marinating');