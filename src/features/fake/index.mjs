import express from 'express'
import list from './list.mjs'

export default function(app) {
    const routes = express.Router()

    routes.get('/:data', list)

    app.use('/fake', routes)
}