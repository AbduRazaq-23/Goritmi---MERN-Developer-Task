import "./src/config/dotenv.js";
import dbConnect from "./src/config/db.js";
import app from "./src/app.js";

// call db function then run the app
dbConnect()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`app is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
