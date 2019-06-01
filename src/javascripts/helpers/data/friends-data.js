import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getfriendsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const friendsResults = results.data;
      const friends = [];
      Object.keys(friendsResults).forEach((friendsId) => {
        friendsResults[friendsId].id = friendsId;
        friends.push(friendsResults[friendsId]);
      });
      resolve(friends);
    })
    .catch(error => reject(error));
});

const addFriend = friendObject => axios.post(`${firebaseUrl}/friends.json`, friendObject);

export default {
  addFriend,
  getfriendsByUid,
};
