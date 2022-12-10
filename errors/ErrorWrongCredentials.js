class ErrorWrongCredentials extends Error {
  constructor(message) {
    super(message);
    this.name = 'WrongCredentialsError';
    this.errorMessage = message;
    this.statusCode = 401;
  }
}

module.exports = ErrorWrongCredentials;
