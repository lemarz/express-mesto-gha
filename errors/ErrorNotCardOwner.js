class ErrorNotCardOwner extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorNotCardOwner';
    this.statusCode = 500;
  }
}

module.exports = ErrorNotCardOwner;
