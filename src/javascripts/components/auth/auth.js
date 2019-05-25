import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/utils';
import googleImage from './google-button.png';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
  console.error('Your sign in function is loading?');
};

const authBuilder = () => {
  let domString = '';
  domString += '<button id="google-auth" class="btn btn-danger">Sign In With Google';
  domString += `<img src="${googleImage}" alt="image of Google sign in icon"/>`;
  domString += '</button>';
  util.printToDom('auth', domString);
  document.getElementById('google-auth').addEventListener('click', signMeIn);
};

export default {
  authBuilder,
};
