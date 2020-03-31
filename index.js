const express = require('express');
const favicon = require('express-favicon');
const dataAcces = require('./dataaccess.js');

const app = express();
const data = dataAcces();
app.use(favicon(__dirname + '/download.png'));

app.get('/', async (req, res) => {

  res.status(200).send('Hello, world!').end();
  
});

// app.get('/users', async(req,res) => {
//   var allUsers = await data.getAllUsers();
//   res.status(200).send(allUsers);
// });

 


const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;