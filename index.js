const express = require('express');
const favicon = require('express-favicon');
const app = express();
const dataAcces = require('./dataaccess.js');
const data = dataAcces();

app.get('/', async (req, res) => {
  var user = {
    FirstName: "First",
    LastName: "Last",
    Username: "User",
    Country: "USA",
    Favourites: ["Pizza"]
  };
  await data.addUser(user);
  res.status(200).send('Hello, world!').end();


});

app.use(favicon(__dirname + '/download.png'));
 


const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;