import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/auth-data';
import authFunctions from './components/auth/auth';
import birfdayFunctions from './components/birfday/birfday';
import navBarEvents from './components/myNavBar/my-nav-bar';
// import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navBarEvents.navBarEvents();
  authData.checkLogInStatus();
  authFunctions.authBuilder();
  birfdayFunctions.birfdayBuilder();
};
init();
