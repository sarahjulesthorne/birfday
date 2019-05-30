import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/auth-data';
import authFunctions from './components/auth/auth';
import navBarEvents from './components/myNavBar/my-nav-bar';
import friendsFunctions from './components/friends/friends';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navBarEvents.navBarEvents();
  authData.checkLogInStatus();
  authFunctions.authBuilder();
  friendsFunctions.showFriends();
};
init();
