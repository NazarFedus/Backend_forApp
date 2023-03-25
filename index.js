const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors({
     origin: '*'
}));

app.use(cors({
     methods: 'GET, POST'
}));
app.use(cors({
     allowedHeaders: 'Content-Type, Authorization'
}));


app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
     try{
          await mongoose.connect('mongodb+srv://nazarfedus5:8O50DhggdOxItWhK@cluster0.qwouo7o.mongodb.net/?retryWrites=true&w=majority');

          app.listen(PORT, () => {
               console.log(`Server started on port: ${PORT}...`);
          })
     } catch(e){
          console.log(e);
     }
}

start();