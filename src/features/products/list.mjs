import path from 'path'
import fs from 'fs'

export default function(req, res) {
    const productMockPath = path.join(__dirname, 'mock', 'ecommerce', 'products', 'index.json')
    const productMockFile = fs.readFileSync(productMockPath, 'utf8')    
    const products = JSON.parse(productMockFile)

    res.send({ code: 200, status: "OK", data: products })
}
