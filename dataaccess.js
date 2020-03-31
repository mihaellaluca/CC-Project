
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
        await datastore.save(user);
        console.log(`Saved ${user.key.name}: ${user.data.FirstName}`);
    },

    async addInFavouritesById(data) { //data = userId, newElements[]
        const userKey = datastore.key(['User', data.userId]);
        const user = await datastore.get(userKey);
      
        data.newElements.forEach(element => {
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

        await datastore.save({
          key: userKey,
          data: objectUser
        });
        console.log(`User ${data.userId} updated successfully.`);

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
      
        await datastore.save(restaurant);
        console.log(`Saved ${restaurant.key.name}: ${restaurant.data.Name}`);
      
    },

    async addInMenuById(data) { //data = restaurantId, newElements[]
        const restaurantKey = datastore.key(['Restaurant', data.restaurantId]);
        const restaurant = await datastore.get(restaurantKey);
      
        data.newElements.forEach(element => {
          if(restaurant[0].Menu.includes(element) === false && element != null)
              restaurant[0].Menu.push(element);
        });
      
        var objectRestaurant = {
          Latitude: restaurant[0].Latitude,
          Longitude: restaurant[0].Longitude,
          Menu: restaurant[0].Menu,
          Name: restaurant[0].Name
        }
        await datastore.save({
          key: restaurantKey,
          data: objectRestaurant
        });
        console.log(`Restaurant ${data.restaurantId} updated successfully.`);

    },

    async deleteRestaurantById(restaurantId) {
        const restaurantKey = datastore.key(['Restaurant', restaurantId]);
        await datastore.delete(restaurantKey);
        console.log(`Restaurant ${taskId} deleted successfully.`);
    }

  }
  };
