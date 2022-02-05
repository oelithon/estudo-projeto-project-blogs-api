const requirementsValidation = (error) => {
  const { path, validatorKey } = error.errors[0];

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
};

module.exports = {
  requirementsValidation,
};
