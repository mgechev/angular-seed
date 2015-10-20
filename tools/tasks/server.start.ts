import {serveSPA} from '../utils';

export = function serverStart(gulp, plugins) {
  return function () {
    serveSPA();
  };
};
