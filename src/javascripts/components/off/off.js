import util from '../../helpers/utils';

const offBuilder = () => {
  let domString = '';
  domString += '<h3>Off<h3>';
  util.printToDom('off', domString);
};

export default {
  offBuilder,
};
