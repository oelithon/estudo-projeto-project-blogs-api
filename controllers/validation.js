const validateDisplayName = (path, validatorKey) => {
  if (path === 'displayName' && validatorKey === 'is_null') {
    return { status: 400, message: '"displayName" is required' };
  }
  if (path === 'displayName') {
    return { status: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  return false;
};

const validateEmail = (path, type, validatorKey) => {
  if (path === 'email' && validatorKey === 'is_null') {
    return { status: 400, message: '"email" is required' };
  }
  if (path === 'email' && type === 'Validation error') {
    return { status: 400, message: '"email" must be a valid email' };
  }
  return false;
};

const validateEmailExists = (path, validatorKey) => {
  if (path === 'Users.email' && validatorKey === 'not_unique') {
    return { status: 409, message: 'User already registered' };
  }
};

const validatePassword = (path, validatorKey) => {
  if (path === 'password' && validatorKey === 'is_null') {
    return { status: 400, message: '"password" is required' };
  }
  if (path === 'password') {
    return { status: 400, message: '"password" length must be 6 characters long' };
  }
  return false;
};

const requirementsValidation = (error) => {
  const { path, type, validatorKey } = error.errors[0];

  return (
    validateDisplayName(path, validatorKey) || validateEmail(path, type, validatorKey) || (
      validateEmailExists(path, validatorKey)) || validatePassword(path, validatorKey) || {}
  );
};

module.exports = {
  requirementsValidation,
};
