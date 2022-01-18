import path from 'path'
import fs from 'fs'

export default function(req, res) {
    const categoryMockPath = path.join(__dirname, 'mock', 'ecommerce', 'categories', 'index.json')
    const categoryMockFile = fs.readFileSync(categoryMockPath, 'utf8')    
    const categories = JSON.parse(categoryMockFile)

    res.send({ code: 200, status: "OK", data: categories })
}
