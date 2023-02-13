const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet")
const morgan = require("morgan")
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");

dotenv.config();

mongoose.connect(process.env, MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, 
    ()=> {console.log("Connected to Mongodb");
})

app.use(bodyParser.json());

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req,res)=>{res.send("Homepage")});

app.listen(3002,()=>{
console.log("backend server is running")

})