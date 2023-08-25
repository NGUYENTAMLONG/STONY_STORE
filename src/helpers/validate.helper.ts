export const validatePassword = (password: string) => {
  // Check if the password length is at least 8 characters
  if (password.length < 8) {
    return {
      status: 400,
      isValid: false,
      code: 'pw001',
      message:
        'Password must be at least 8 characters long / Mật khẩu phải có độ dài ít nhất là 8 ký tự',
    };
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      status: 400,
      isValid: false,
      code: 'pw002',
      message:
        'Password must have at least one uppercase letter / Mật khẩu phải có it nhất một chữ cái viết hoa',
    };
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      status: 400,
      isValid: false,
      code: 'pw003',
      message:
        'Password must have at least one lowercase letter / Mật khẩu phải có it nhất một chữ cái viết thường',
    };
  }

  // Check if the password contains at least one digit
  if (!/\d/.test(password)) {
    return {
      status: 400,
      isValid: false,
      code: 'pw004',
      message:
        'Password must have at least one digit / Mật khẩu chứa ít nhất một chữ số',
    };
  }

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*]/.test(password)) {
    return {
      status: 400,
      isValid: false,
      code: 'pw005',
      message:
        'Password must have at least one special character  / Mật khẩu chứa ít nhất một ký tự đặc biệt',
    };
  }

  // Check if the password contains a space character
  if (/\s/.test(password)) {
    return {
      status: 400,
      isValid: false,
      code: 'pw006',
      message:
        'Password must not contain spaces  / Mật khẩu không được chứa khoảng trắng',
    };
  }

  // If all checks pass, the password is valid
  return {
    status: 200,
    isValid: true,
    message: 'Password is valid / Mật khẩu hợp lệ',
  };
};
