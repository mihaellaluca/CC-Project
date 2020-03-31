
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();

module.exports = function (){
  return {
    //USERS
    async getAllUsers () {
        const query = datastore.createQuery('User');
        const [users] = await datastore.runQuery(query);
        return users;
    },
    
    async addUser(data) {
        const userKey = datastore.key(['User']);
        const user = {
          key: userKey,
          data: {
              FirstName: data.firstName,
              LastName: data.lastName,
              Username: data.username,
              Country: data.country,
              Favourites: data.favourites
            }
        };
        return await datastore.save(user);
    },

    async addInFavouritesById(userId, newElements) {
        const userKey = datastore.key(['User', userId]);
        const user = await datastore.get(userKey);
        
        newElements.forEach(element => {
          if(user[0].Favourites.includes(element) === false && element != null)
              user[0].Favourites.push(element);
        });
        var objectUser = {
          FirstName: user[0].FirstName,
          LastName: user[0].LastName,
          Username: user[0].Username,
          Country: user[0].Country,
          Favourites: user[0].Favourites
        };

        return await datastore.save({
          key: userKey,
          data: objectUser
        });       
    },
    

    //RESTAURANTS
    async getAllRestaurants() {
        const query = datastore.createQuery('Restaurant');
        const [restaurants] = await datastore.runQuery(query);
        return restaurants;
    },

    async addRestaurant(data) {
        const restaurantKey = datastore.key(["Restaurant"]);
        const restaurant = {
          key: restaurantKey,
          data: {
            Latitude: data.latitude,
            Longitude: data.longitude,
            Menu: data.menu,
            Name: data.name
          }
        };
  
        return await datastore.save(restaurant);
      
    },

    async addInMenuById(restaurantId, newElements) { //data = restaurantId, newElements[]
        const restaurantKey = datastore.key(['Restaurant', restaurantId]);
        const restaurant = await datastore.get(restaurantKey);
      
        newElements.forEach(element => {
          if(restaurant[0].Menu.includes(element) === false && element != null)
              restaurant[0].Menu.push(element);
        });
      
        var objectRestaurant = {
          Latitude: restaurant[0].Latitude,
          Longitude: restaurant[0].Longitude,
          Menu: restaurant[0].Menu,
          Name: restaurant[0].Name
        }
        
        return await datastore.save({
          key: restaurantKey,
          data: objectRestaurant
        });
    },

    async deleteRestaurantById(restaurantId) {
        const restaurantKey = datastore.key(['Restaurant', restaurantId]);
        return await datastore.delete(restaurantKey);
    }

  }
  };
