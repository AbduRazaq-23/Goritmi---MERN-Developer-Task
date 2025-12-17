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

JWT_SECRET= your_secret
JWT_EXPIRY= your_time
NODE_ENV= production

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

<!-- Register -->

authRouter.route("/register").post(register);

<!-- Controller -->

1.  Basic validation
2.  Check existing user
3.  Hash password
4.  Generate OTP
5.  Hash OTP
6.  Send OTP email
7.  Return response as success with message

<!-- ================================================================= -->

<!-- Verify Otp -->

authRouter.route("/otp/verify").post(verifyOtp);

<!-- Controlller -->

1. Validate input (email, otp)
2. Find user
3. Check Otp existence
4. Check otp expiry
5. Max attempts check (5)
6. Compare OTP (bcrypt)
7. Otp success Email isEmailVerified true & save
8. Issue JWT token
9. Token Options
10. Return res as success & set cookie

OTP verification compares the user-entered OTP against a bcrypt-hashed OTP stored in the database.
OTPs expire after 10 minutes and allow a maximum of 5 attempts.
After successful verification, OTP fields are cleared and a JWT session is issued.

<!-- ================================================================= -->
