import path from 'path'
import fs from 'fs'

export default function(req, res) {
   let data = loadData(req, res)

    if (req.query.id || req.query.name) {
        applyFilter(req, res, data)
    }

    res.send({ code: 200, status: "OK", data: data })
}

function loadData(req, res) {
    const urlParam = req.params.data
    const dataPath = path.join(__dirname, 'mock', 'data', `${urlParam}.json`)

    if(!fs.existsSync(dataPath)) {
        return res.status(404).send({ code: 404, status: "NOT_FOUND" })
    }

    const dataFile = fs.readFileSync(dataPath, 'utf8')
    return JSON.parse(dataFile)
}

function applyFilter(req, res, data) {
    for (let key in data) {
        if (data.hasOwnProperty(key) && req.query.name) {
            if (data[key]["name"].toLowerCase() === req.query.name.toLowerCase()) {
                return res.send({
                    code: 200,
                    status: "OK",
                    data: data[key]
                })
            }
        }
    }

    return res.status(404).send({ code: 404, status: "NOT_FOUND" })
}
