import express from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import { userRouter } from "./users/users.routes"
import { productRouter } from "./products/product.routes"

import fs from 'fs'
import http from 'http'
import https from 'https'

var privateKey  = fs.readFileSync('../sense.map.key', 'utf8');
var certificate = fs.readFileSync('../sense.map.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

dotevnv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())

app.use('/api', userRouter)

var server = https.createServer(credentials, app);
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})