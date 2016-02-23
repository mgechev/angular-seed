import {serveCoverage} from '../utils';

export = function serverStart(gulp, plugins) {
  return function () {
    serveCoverage();
  };
};
