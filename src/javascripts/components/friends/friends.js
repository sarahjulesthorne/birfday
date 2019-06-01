import firebase from 'firebase/app';
import 'firebase/auth';

import birthdayData from '../../helpers/data/birthday-data';
import friendsData from '../../helpers/data/friends-data';
import rsvpData from '../../helpers/data/rsvps-data';
import smash from '../../helpers/smash';
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

const deleteFriendsEvents = (e) => {
  e.preventDefault();
  const friendId = e.target.id;
  friendsData.deleteFriend(friendId)
    .then(() => getFriends(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(error => console.error('no deletion', error));
};

const radioButtonEvent = (e) => {
  const rsvpId = e.target.closest('td').id;
  console.error(rsvpId);
  const rsvp = {
    birthdayId: e.target.closest('table').id,
    friendId: e.target.id.split('.', [1]),
    statusId: e.target.value,
  };
  if (rsvpId) {
    // update
    rsvpData.editRsvp(rsvpId, rsvp)
      .then(() => getFriends(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
      .catch(error => console.error('could not update RSVP', error));
  } else {
    // add
    rsvpData.addRsvp(rsvp)
      .then(() => getFriends(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
      .catch(error => console.error('could not add RSVP', error));
  }
};

const addEvents = () => {
  document.getElementById('add-friend-button').addEventListener('click', newFriendButton);
  const deleteButtons = Array.from(document.getElementsByClassName('delete-friend'));
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteFriendsEvents);
  });
  const radioButtons = Array.from(document.getElementsByClassName('radio'));
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('click', radioButtonEvent);
  });
};

const showFriends = (friends, birthday) => {
  let domString = '<div class="col-6 offset-3">';
  domString += '<h2>Friends</h2>';
  domString += '<button id="add-friend-button" class="btn btn-info">Add Friend</button>';
  domString += `<table id ="${birthday}" class="table table-striped"`;
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
    console.error(friend);
    domString += '<div class="custom-control custom-radio custom-control-inline">';
    domString += `<input type="radio" value="${friend.id}" id="radio1.${friend.id}" name="radio-buttons_${friend.id}" class="radio custom-control-input" ${friend.statusId === 'status2' ? 'checked' : ''}>`; // eslint-disable-line max-len
    domString += `<label class="custom-control-label" for="radio1.${friend.id}">Yes</label>`;
    domString += '</div>';
    domString += '<div class="custom-control custom-radio custom-control-inline">';
    domString += `<input type="radio" value="${friend.id}" id="radio2.${friend.id}" name="radio-buttons_${friend.id}" class="radio custom-control-input" ${friend.statusId === 'status3' ? 'checked' : ''}>`; // eslint-disable-line max-len
    domString += `<label class="custom-control-label" for="radio2.${friend.id}">No</label>`;
    domString += '</div>';
    domString += '<div class="custom-control custom-radio custom-control-inline">';
    domString += `<input type="radio" value="${friend.id}" id="radio3.${friend.id}" name="radio-buttons_${friend.id}" class="radio custom-control-input" ${friend.statusId === 'status1' ? 'checked' : ''}>`; // eslint-disable-line max-len
    domString += `<label class="custom-control-label" for="radio3.${friend.id}">Unknown</label>`;
    domString += '</div>';
    domString += '</td>';
    domString += `<th scope="col"><button id=${friend.id} class="btn btn-danger delete-friend">X</button></th>`;
    domString += '</tr>';
  });
  domString += '</tbody>';
  domString += '</table>';
  domString += '</div>';
  util.printToDom('friends', domString);
  addEvents();
};

const getFriends = (uid) => {
  friendsData.getfriendsByUid(uid)
    .then((friends) => {
      birthdayData.getBirthdayByUid(uid)
        .then((birthday) => {
          rsvpData.getRsvpsByBirthdayId(birthday.id)
            .then((rsvps) => {
              const finalFriends = smash.friendRsvps(friends, rsvps);
              console.error('friendsArray', finalFriends);
              showFriends(finalFriends, birthday.id);
            });
        });
    })
    .catch(error => console.error(error, 'could not get friends by uid'));
};

export default {
  getFriends,
};
