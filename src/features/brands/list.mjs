import path from 'path'
import fs from 'fs'

export default function(req, res) {
    const brandMockPath = path.join(__dirname, 'mock', 'ecommerce', 'brands', 'index.json')
    const brandMockFile = fs.readFileSync(brandMockPath, 'utf8')    
    const brands = JSON.parse(brandMockFile)

    res.send({ code: 200, status: "OK", data: brands })
}
