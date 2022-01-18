import path from 'path'
import fs from 'fs'

export default function(req, res) {
    const unitMockPath = path.join(__dirname, 'mock', 'ecommerce', 'units', 'index.json')
    const unitMockFile = fs.readFileSync(unitMockPath, 'utf8')    
    const units = JSON.parse(unitMockFile)

    res.send({ code: 200, status: "OK", data: units })
}
