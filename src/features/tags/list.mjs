import path from 'path'
import fs from 'fs'

export default function(req, res) {
    const tagMockPath = path.join(__dirname, 'mock', 'ecommerce', 'tags', 'index.json')
    const tagMockFile = fs.readFileSync(tagMockPath, 'utf8')    
    const tags = JSON.parse(tagMockFile)

    res.send({ code: 200, status: "OK", data: tags })
}
