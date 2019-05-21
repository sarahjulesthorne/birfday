import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import offFunctions from './components/off/off';
import birfdayFunctions from './components/birfday/birfday';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  offFunctions.offBuilder();
  birfdayFunctions.birfdayBuilder();
};
init();
