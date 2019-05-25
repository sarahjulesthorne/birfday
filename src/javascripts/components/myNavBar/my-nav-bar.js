import firebase from 'firebase/app';
import 'firebase/auth';

const navBarEvents = () => {
  const navLinks = Array.from(document.getElementsByClassName('nav-link'));
  navLinks.forEach((navLink) => {
    navLink.addEventListener('click', (e) => {
      if (e.target.id === 'navbar-button-logout') {
        firebase.auth().signOut();
      }
    });
  });
};

export default {
  navBarEvents,
};
