const mongoose =require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");

const userRouter =require("./Routers/userRouter")


dotenv.config();

app.use(express.json());
app.use(express.urlencoded())


const corsOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOption))

app.use(userRouter)

const url=process.env.URL_MONGO ;
const port=process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


mongoose.connect(url)
  .then(()=>{
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    
  })
  .catch((error)=>{
    console.log(error)
  })
