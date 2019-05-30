import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addFriend = friendObject => axios.post(`${firebaseUrl}/friends.json`, friendObject);

export default {
  addFriend,
};
