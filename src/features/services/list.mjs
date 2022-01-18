import path from 'path'
import fs from 'fs'

export default function(req, res) {
    const serviceMockPath = path.join(__dirname, 'mock', 'ecommerce', 'services', 'index.json')
    const serviceMockFile = fs.readFileSync(serviceMockPath, 'utf8')    
    const services = JSON.parse(serviceMockFile)

    res.send({ code: 200, status: "OK", data: services })
}
