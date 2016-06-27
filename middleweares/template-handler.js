'use strict';

module.exports = (template, req, res, next) => {
  if (!template.isTemplate) {
    // not template, bypass
    next(template);
    return;
  }

  res.render(template.path, template.args);
};
