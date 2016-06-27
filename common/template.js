'use strict';

class Template {
  constructor(path, args) {
    this.isTemplate = true;
    this.path = path;
    this.args = args;
  }
}

exports.render = (path, args) => {
  return new Template(path, args || {});
};
