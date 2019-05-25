import util from '../../helpers/utils';

const birfdayBuilder = () => {
  let domString = '';
  domString += '<h3>Birfday<h3>';
  util.printToDom('birfday', domString);
};

export default {
  birfdayBuilder,
};
