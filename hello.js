const dataAcces = require('./dataaccess.js');


const data = dataAcces();
function heloo() {

    data.getAllUsers().then((users)=> {
      let response = [];
      let usersCount = {};
      users.forEach(user => {
        if(usersCount[user.Country] == undefined)
        usersCount[user.Country] = 1;
        else usersCount[user.Country] += 1;
      })
      for (let [key, value] of Object.entries(usersCount)) {
        response.push([key, value]);
      }
    console.log(usersCount);
    console.log(response);
      
     });
   
 };

 console.log("uite:" + heloo());