import { AppDataSource } from "./data-source"
import router from "./router/router"
const express = require('express')
import cors from "cors"

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })



const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
    

const app = express()
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded())
app.use(router)


app.listen(3000, () => {
    console.log('server listening on port 3000')
})
