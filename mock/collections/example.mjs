import faker from '@faker-js/faker'
import fs from 'fs'
import path from "path";

function example() {
    return {
        "name": faker.random.words()
    }
}

export default function (total) {
    let data = Array.from({ length: total }, example)

    const dataPath = path.join(__dirname, 'mock', 'data', 'example.json')
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))

    return data
}