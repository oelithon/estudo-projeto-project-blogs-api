const requirementsValidation = (error) => {
  const { path } = error.errors[0];

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
