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

🚀 Features Implemented 12/16/2025

✔ MongoDB database connection
✔ Environment-based configuration
✔ Email sending using Nodemailer (SMTP)
✔ OTP generation using otp-generator
✔ User registration API
✔ OTP sent to email on registration
✔ Secure password hashing (bcrypt)
✔ Modular folder structure

🛠 Tech Stack

Node.js

Express.js

MongoDB & Mongoose

Nodemailer (SMTP)

otp-generator

bcryptjs

dotenv

<!-- ================================================================ -->
