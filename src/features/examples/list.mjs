import path from 'path'
import fs from 'fs'

export default function(req, res) {
    const exampleDataPath = path.join(__dirname, 'mock', 'data', 'examples.json')
    const exampleDataFile = fs.readFileSync(exampleDataPath, 'utf8')
    const examples = JSON.parse(exampleDataFile)

    res.send({ code: 200, status: "OK", data: examples })
}
