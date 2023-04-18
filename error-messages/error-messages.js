function invalidIdError() {
  return {
    message: 'Invalid ID',
    status: 400
  };
}

function unexpectedError() {
  return {
    message: 'Unexpected error',
    status: 500
  };
}

function notFoundError(documentName) {
  if (documentName) {
    return {
      message: `${documentName} not found`,
      status: 404
    };
  }
  return {
    message: 'Not found',
    status: 404
  };
}


export { invalidIdError, unexpectedError, notFoundError }