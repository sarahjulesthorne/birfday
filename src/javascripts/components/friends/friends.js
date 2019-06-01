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
      getFriends(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(error => console.error('friend addition failed', error));
};

const newFriendButton = () => {
  document.getElementById('birfday').classList.add('hide');
  document.getElementById('newFriends').classList.remove('hide');
  document.getElementById('saveNewFriend').addEventListener('click', createNewFriend);
};

const showFriends = (friends) => {
  let domString = '<div class="col-6 offset-3">';
  domString += '<h2>Friends</h2>';
  domString += '<button id="add-friend-button" class="btn btn-info">Add Friend</button>';
  domString += '<table class="table table-striped"';
  domString += '<thead>';
  domString += '<tr>';
  domString += '<th scope="col">Name</th>';
  domString += '<th scope="col">Email</th>';
  domString += '<th scope="col">RSVP</th>';
  domString += '<th scope="col"></th>';
  domString += '</tr>';
  domString += '</thead>';
  domString += '<tbody>';
  friends.forEach((friend) => {
    domString += '<tr>';
    domString += `<td>${friend.name}</td>`;
    domString += `<td>${friend.email}</td>`;
    domString += `<td id=${friend.rsvpId}>`;
    domString += '<div class="custom-control custom-radio custom-control-inline">';
    domString += '<input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input">';
    domString += '<label class="custom-control-label" for="customRadioInline1">Toggle this custom radio</label>';
    domString += '</div>';
    domString += '<div class="custom-control custom-radio custom-control-inline">';
    domString += '<input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input">';
    domString += '<label class="custom-control-label" for="customRadioInline2">Or toggle this other custom radio</label>';
    domString += '</div>';
    domString += '<div class="custom-control custom-radio custom-control-inline">';
    domString += '<input type="radio" id="customRadioInline3" name="customRadioInline1" class="custom-control-input">';
    domString += '<label class="custom-control-label" for="customRadioInline3">Or toggle this other custom radio</label>';
    domString += '</div>';
    domString += '</td>';
    domString += `<th scope="col"><button id=${friend.id} class="btn btn-danger delete-friend">X</button></th>`;
    domString += '</tr>';
  });
  domString += '</tbody>';
  domString += '</table>';
  domString += '</div>';
  util.printToDom('friends', domString);
  document.getElementById('add-friend-button').addEventListener('click', newFriendButton);
};

const getFriends = (uid) => {
  friendsData.getfriendsByUid(uid)
    .then((friends) => {
      console.error('friendsArray', friends);
      showFriends(friends);
    })
    .catch(error => console.error(error, 'could not get friends by uid'));
};

export default {
  getFriends,
};
