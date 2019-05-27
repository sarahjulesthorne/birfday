import util from '../../helpers/utils';

import birthdayData from '../../helpers/data/birthday-data';

const birfdayBuilder = (uid) => {
  birthdayData.getBirthdayByUid(uid)
    .then((birthday) => {
      let domString = `<h1>${birthday.date}</h1>`;
      domString += `<img src="${birthday.imageUrl}" alt="birthday location"/>`;
      domString += `<h2>${birthday.location} At ${birthday.time}<h2>`;
      util.printToDom('event', domString);
    })
    .catch(error => console.error('Could not get birthday', error));
};

export default {
  birfdayBuilder,
};
