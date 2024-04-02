const mongoose =require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded())
app.use(cors())

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
