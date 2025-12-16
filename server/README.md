server/
│ ├── src/
| | ├── config/
| | | ├── db.js
| | | ├── dotenv.js
│ │ ├── controllers/
│ │ │ ├── auth.controller.js
│ │ │  
│ │ ├── middlewares/
│ │ │ ├── auth.middleware.js
│ │ │  
│ │ ├── models/
│ │ │ ├── user.model.js
│ │ │  
│ │ ├── routes/
│ │ │ ├── auth.routes.js
│ │ │  
│ │ ├── utils/
| | | ├── generateOtp.js
| | | ├── sendEmail.js
│ │ │  
│ │ └── app.js
│ └── index.js

<!-- ============================================================= -->

.env sample

PORT=5000

MONGOOSE_URI=your url

SMTP_HOST=smtp.gmail.com

SMTP_PORT=yout port

SMTP_USER=smtp.gmail.com

SMTP_PASS=your_app_password

SMTP_EMAIL=your_email@gmail.com

<!-- ============================================================== -->
