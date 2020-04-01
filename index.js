const express = require('express');
const favicon = require('express-favicon');
const dataAcces = require('./dataaccess.js');

const app = express();
const data = dataAcces();

app.use(favicon(__dirname + '/download.png'));


app.get('/', async (req, res) => {

  res.status(200).send('Hello, world!').end();
});

app.get("/", async (req, res) => {
  res
    .status(200)
    .send("Hello, world!")
    .end();
});

app.get('/users', async(req,res) => {
  var allUsers = await data.getAllUsers();
  res.status(200).send(allUsers);
});

 


const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;

//CLOUD FUNCTIONS 
module.exports.getNumberOfUsers = (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');
  data.getAllUsers().then((users)=> {
    let usersCount = {};
    let response = [["Country", "Number of people"]];
    users.forEach(user => {
      if(usersCount[user.Country] == undefined)
      usersCount[user.Country] = 1;
      else 
      usersCount[user.Country] += 1;
    });
   
    for (let [key, value] of Object.entries(usersCount)) {
      response.push([key, value]);
    }
    res.writeHead(200, {"Content-type":"application/json"});
    res.write(JSON.stringify(response));
    res.end();
  }); 
};


//CLOUD FUNCTION:

module.exports.getTopFood = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  let country = req.query.country;
  var statistic = {};
  var sortedStatistic = [];
  var allUsers = await data.getAllUsers();

  allUsers.forEach(user => {
    if (user.Country === country) {
      user.Favourites.forEach(food => {
        if (food in statistic) {
          statistic[food]++;
        } else {
          statistic[food] = 1;
        }
      });
    }
  });

  for (var food in statistic) {
    sortedStatistic.push([food, statistic[food]]);
  }
  sortedStatistic.sort((a, b) => {
    return b[1] - a[1];
  });

  console.log(sortedStatistic);
  
  res.status(200).send(JSON.stringify(sortedStatistic));
  res.end();
};
