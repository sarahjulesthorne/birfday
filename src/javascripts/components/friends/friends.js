import firebase from 'firebase/app';
import 'firebase/auth';

import friendsData from '../../helpers/data/friends-data';
import util from '../../helpers/utils';

const createNewFriend = (e) => {
  e.preventDefault();
  const newFriend = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    uid: firebase.auth().currentUser.uid,
  };
  friendsData.addFriend(newFriend)
    .then(() => {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('birfday').classList.remove('hide');
      document.getElementById('newFriends').classList.add('hide');
    })
    .catch(error => console.error('friend addition failed', error));
};

const newFriendButton = () => {
  document.getElementById('birfday').classList.add('hide');
  document.getElementById('newFriends').classList.remove('hide');
  document.getElementById('saveNewFriend').addEventListener('click', createNewFriend);
};

const showFriends = () => {
  const domString = '<button id="add-friend-button" class="btn btn-danger">Add Friend</button>';
  util.printToDom('friends', domString);
  document.getElementById('add-friend-button').addEventListener('click', newFriendButton);
};

export default {
  showFriends,
};
