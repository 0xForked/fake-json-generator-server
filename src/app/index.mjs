import express from 'express'
import cors from 'cors'
import routes from './routes.mjs'

const app = express()

app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Credentials']
}))


// home and not found handler
app.get('/', (req, res) => { res.send({code: 200, message: "welcome to mock json data"}) })
app.get('*', (req, res) => { res.send({code: 404, message: "path that you're looking for not found"}) })

// features routes
routes(app)

export default app
