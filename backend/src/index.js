const mongoose =require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const fs = require('fs');
const cookieParser = require("cookie-parser");

const authRouter =require("./Routers/AuthRouter")
const userRouter =require("./Routers/userRouter")
const postRouter =require("./Routers/postRouter")
const CORouter =require("./Routers/CORouter")
const CVRouter =require("./Routers/CVRouter")
const reportRouter =require("./Routers/reportRouter")
const ApplicationsRouter =require("./Routers/ApplicationsRouter")

dotenv.config();


app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser()); 


const corsOption = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:  [
    "Authorization", 
    "Content-Type", 
    "Accept", 
    "X-Requested-With", 
    "Cache-Control", 
    "X-Custom-Header" // Thêm các header tùy chỉnh của bạn nếu cần
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  exposedHeaders: ["Authorization"],
};

app.options('*', cors(corsOption));
app.use(cors(corsOption))

app.use(authRouter)
app.use(userRouter)
app.use(postRouter)
app.use(CORouter)
app.use(CVRouter)
app.use(ApplicationsRouter)
app.use(reportRouter)


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
