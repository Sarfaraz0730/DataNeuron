const express = require("express");
const cors = require('cors')
const connectDatabase = require("./database/db");
const router = require("./routes/table/index")
const app = express();
app.use(cors())



const PORT =8000


connectDatabase()
app.use(express.json());
let addCount = 0;
let updateCount = 0;
app.use(router)



app.listen(PORT,()=>{
    console.log(`Server is Listening on ${PORT}`)

})