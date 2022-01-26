import path from 'path'
import fs from 'fs'

export default function(req, res) {
   let data = loadData(req, res)

    if (req.query.id || req.query.name) {
        return applyFilter(req, res, data)
    }

    return res.send({ code: 200, status: "OK", data: data })
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
    let collection = []
    data.forEach(function (obj, index) {
        if (req.query.name && obj.name.toLowerCase() === req.query.name.toLowerCase()) {
            collection.push(obj)
        }
    })

    if (collection.length > 0) {
        return res.send({
            code: 200,
            status: "OK",
            data: collection
        })
    }

    return res.status(404).send({ code: 404, status: "NOT_FOUND" })
}
