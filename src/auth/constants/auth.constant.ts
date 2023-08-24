export const EXCEPTION_AUTH = {
  WRONG_ACCOUNT: {
    message: 'EMAIL OR USERNAME IS INCORRECT',
    code: 'auth001',
  },

  WRONG_PASSWORD: {
    message: 'WRONG PASSWORD',
    code: 'auth002',
  },

  PASSWORD_DOES_NOT_MATCH: {
    message: 'PASSWORD DOES NOT MATCH',
    code: 'auth003',
  },

  UNDEFINED_EMAIL_USERNAME: {
    message: 'EMAIL OR USERNAME UNDEFINED',
    code: 'auth004',
  },

  TOKEN_EXPIRED_VERIFY: {
    message: 'TOKEN EXPIRED VERIFY',
    code: 'auth005',
  },

  EMAIL_EXISTED: {
    message: 'EMAIL EXISTED',
    code: 'auth006',
  },

  USERNAME_EXISTED: {
    message: 'USERNAME EXISTED',
    code: 'auth007',
  },
};
