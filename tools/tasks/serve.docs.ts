import {serveDocs} from '../utils';

export = function serverStart(gulp, plugins) {
  return function () {
    serveDocs();
  };
};
