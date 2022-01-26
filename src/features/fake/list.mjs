import path from 'path'
import fs from 'fs'

export default function(req, res) {
    const urlParam = req.params.data

    const dataPath = path.join(__dirname, 'mock', 'data', `${urlParam}.json`)

    if(!fs.existsSync(dataPath)) {
        res.status(404).send({ code: 404, status: "NOT_FOUND" })
    }

    const dataFile = fs.readFileSync(dataPath, 'utf8')
    const data = JSON.parse(dataFile)

    res.send({ code: 200, status: "OK", data: data })
}
