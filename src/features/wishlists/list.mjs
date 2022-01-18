import path from 'path'
import fs from 'fs'

export default function(req, res) {
    const wishlistMockPath = path.join(__dirname, 'mock', 'ecommerce', 'wishlists', 'index.json')
    const wishlistMockFile = fs.readFileSync(wishlistMockPath, 'utf8')    
    const wishlists = JSON.parse(wishlistMockFile)

    res.send({ code: 200, status: "OK", data: wishlists })
}
