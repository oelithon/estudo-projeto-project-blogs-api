const requirementsValidation = (error) => {
  const { path, type, validatorKey } = error.errors[0];

  if (path === 'displayName' && validatorKey === 'is_null') {
    return {
      status: 400,
      message: '"displayName" is required',
    };
  }
  if (path === 'displayName') {
    return {
      status: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
  }
  if (path === 'email' && validatorKey === 'is_null') {
    return {
      status: 400,
      message: '"email" is required',
    };
  }
  if (path === 'email' && type === 'Validation error') {
    return {
      status: 400,
      message: '"email" must be a valid email',
    };
  }
};

module.exports = {
  requirementsValidation,
};
