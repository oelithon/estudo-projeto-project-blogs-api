const validateEmail = (email) => {
  if (email === '') {
    return { status: 400, message: '"email" is not allowed to be empty' };
  }
  if (!email) {
    return { status: 400, message: '"email" is required' };
  }
  return false;
};

const validatePassword = (password) => {
  if (password === '') {
    return { status: 400, message: '"password" is not allowed to be empty' };
  }
  if (!password) {
    return { status: 400, message: '"password" is required' };
  }
  return false;
};

const emailAndPasswordValidate = (email, password) =>
  validateEmail(email) || validatePassword(password) || false;

module.exports = {
  emailAndPasswordValidate,
};
