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

export default verifyAccount;
