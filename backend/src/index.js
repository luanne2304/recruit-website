const mongoose =require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const fs = require('fs');

const userRouter =require("./Routers/userRouter")
const postRouter =require("./Routers/postRouter")
const CORouter =require("./Routers/CORouter")
const CVRouter =require("./Routers/CVRouter")
const ApplicationsRouter =require("./Routers/ApplicationsRouter")

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
app.use(postRouter)
app.use(CORouter)
app.use(CVRouter)
app.use(ApplicationsRouter)


const url=process.env.URL_MONGO ;
const port=process.env.PORT;

app.get('/api/getTree', (req, res) => {
  fs.readFile('./src/JsonTinhThanh/tree.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const jsonData = JSON.parse(data);
    return res.json(jsonData);
  });
});

mongoose.connect(url)
  .then(()=>{
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    
  })
  .catch((error)=>{
    console.log(error)
  })
