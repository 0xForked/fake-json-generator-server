import express from 'express'
import cors from 'cors'
import routes from './routes.mjs'
import path from 'path'

const app = express()

app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Credentials']
}))

// features routes
routes(app)

// home and not found handler
app.get('/', (req, res) => { res.send({code: 200, message: "welcome to mock json data"}) })
app.get('*', (req, res) => { res.send({code: 404, message: "path that you're looking for not found"}) })

export default app
