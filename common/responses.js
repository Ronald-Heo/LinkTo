'use strict';

class Response {
  constructor(status, message, header) {
    this.status = status;
    this.message = message;
    this.header = header || {};
  }
}

class BadRequest extends Response {
  constructor(message) {
    super(400, message);
  }
}

exports.BadRequest = BadRequest;

class Unauthorized extends Response {
  constructor(message) {
    super(401, message);
  }
}

exports.Unauthorized = Unauthorized;

class NotFound extends Response {
  constructor(message) {
    super(404, message);
  }
}

exports.NotFound = NotFound;

class Redirect extends Response {
  constructor(url) {
    super(302, '', {Location: url});
  }
}

exports.Redirect = Redirect;
