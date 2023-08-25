import { config } from 'dotenv';
config();
function verifyAccount(emailSubject, emailTitle, emailContent, emailJwt) {
  return `
    <!DOCTYPE html>
<html>

<head>
  <title>${emailSubject}</title>
  <style>
    body {
      background-color: seagreen;
    }
    h1{
        text-align:center;
    }
    a{
        text-decorator:none;
    }
    button{
        border-radius:'10px';
    }
  </style>
</head>

<body>
  <h1>${emailTitle}</h1>
  <hr>
  <b>Vui lòng nhấn nút dưới đây để kích hoạt tài khoản của bạn:</b>
  <a href='http://${process.env.BASE_URI}:${process.env.PORT}/auth/verify/${emailJwt}'>
  <button>
  VERIFY NOW</button>
  </a>
  <p>${emailContent}</p>

</body>

</html>
    `;
}
function verifyAccountAgain(emailSubject, emailTitle, emailContent, emailJwt) {
  return `
    <!DOCTYPE html>
<html>

<head>
  <title>${emailSubject}</title>
  <style>
    body {
      background-color: seagreen;
    }
    h1{
        text-align:center;
    }
    a{
        text-decorator:none;
    }
    button{
        border-radius:'10px';
    }
  </style>
</head>

<body>
  <h1>${emailTitle}</h1>
  <hr>
  <b>Vui lòng nhấn nút dưới đây để kích hoạt tài khoản của bạn:</b>
  <a href='http://${process.env.BASE_URI}:${process.env.PORT}/auth/verify/${emailJwt}'>
  <button>
  VERIFY AGAIN NOW</button>
  </a>
  <p>${emailContent}</p>

</body>

</html>
    `;
}
function resultVerifyAccountAgain(emailSubject, emailTitle, emailPayload) {
  return `
    <!DOCTYPE html>
<html>

<head>
  <title>${emailSubject}</title>
  <style>
    body {
      background-color: seagreen;
    }
    h1{
        text-align:center;
    }
    a{
        text-decorator:none;
    }
    button{
        border-radius:'10px';
    }
  </style>
</head>

<body>
  <h1>${emailTitle}</h1>
  <hr>
  <b>Tài khoản của bạn đã được kích hoạt vui lòng đăng nhập lại với username và password như sau:</b>
  <p><b>Username: </b> ${emailPayload.username}</p>
  <p><b>Password: </b> ${emailPayload.resetedPassword}</p>
</body>

</html>
    `;
}
function forgotPasswordForm(
  emailSubject: string,
  emailTitle: string,
  emailJwt: string,
): string {
  return `
    <!DOCTYPE html>
<html>

<head>
  <title>${emailSubject}</title>
  <style>
    body {
      background-color: seagreen;
    }
    h1{
        text-align:center;
    }
    a{
        text-decorator:none;
    }
    button{
        border-radius:'10px';
    }
  </style>
</head>

<body>
  <h1>${emailTitle}</h1>
  <hr>
  <b>Hãy click vào đây:</b>
    <a href='http://${process.env.BASE_URI}:${process.env.PORT}/auth/get-recover-password-form/${emailJwt}'>
  <button>
  Lấy lại mật khẩu nào</button>
  </a>
</body>

</html>
    `;
}
export {
  verifyAccount,
  verifyAccountAgain,
  resultVerifyAccountAgain,
  forgotPasswordForm,
};
