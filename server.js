const express = require("express"); // declare variable and assign the package to it
const mongoose = require("mongoose"); // we can use these functions to use functionalities of each packages
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config(); // use the dotenv file which has mongodb url

const PORT = process.env.PORT || 4000; // (||-logical or operation)
const URL = process.env.MONGODB_URL;

//middlewares
app.use(cors()); // use the cors (Cross Origin Resource Sharing) package
app.use(bodyParser.json()); // in mongodb there exist json format(key value pairs)
app.use(express.json());
app.disable('x-powered-by');
//This line disables the X-Powered-By header in the HTTP response.
//The X-Powered-By header reveals the technology or framework being
// used by the server, which can be a security risk.
mongoose.set("strictQuery", true);

const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifieldTopology: true,
  };
  try {
    mongoose.connect(
      "mongodb+srv://malkithamanda:99Mathematics@cluster0.qvv4jwk.mongodb.net/jobBank_db?retryWrites=true&w=majority"
    );
    console.log("Mongodb connection success!");
  } catch (err) {
    console.log(err);
    console.log("Database connection failed");
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});

database();

const studentRouter = require("./routes/students.js"); // import students.js to studentRouter
app.use("/student", studentRouter); // When calling /student URL , it loads file the studentRouter that assign to studentRouter varibale

app.use(express.static("uploads")); // for retrieving of images using the URL it static  upload folder

const mycompanyRouter = require("./routes/companies.js"); // import students.js to studentRouter
app.use("/company", mycompanyRouter); // When calling /student URL , it loads file the studentRouter that assign to studentRouter variable

const vacancyRouter=require("./routes/vacancies.js");
app.use("/vacancy",vacancyRouter);

const authRouter= require("./routes/auth.js")
app.use("/auth",authRouter);

/*mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopologyL: true,
    useFindAndModify: false
    }); */

/*const connection = mongoose.connection;
connection.once("open",()=>{
console.log("Mongodb connection success!");
  })*/