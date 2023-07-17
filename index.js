const express = require("express");
const cors = require("cors");

const app = express();
//adding middleware
app.use(express.json());
app.use(cors());

require("dotenv").config();
const PORT = process.env.PORT || 3000;



const connectWithDb = require("./config/databse");
const userRouter = require("./Routes/userRoute");
const noteRouter = require("./Routes/noteRouter");
connectWithDb ();

app.use("/users", userRouter);
app.use("/note", noteRouter);

//get request
app.get("/", (req,res) => {
      res.send(`<h1>Notes API </h1>`)
  })



  app.listen(PORT ,() => {
      console.log(`App started form  the Port ${PORT}`);
  })