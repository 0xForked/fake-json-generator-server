import { generateProduct } from '../collections/product.mjs'

export function generateData(collection) {
    if (collection === null) {
        all()
    }
    console.log( generateProduct(10) )
}

function single(collection) {
    console.log(`generate data for ${collection}`)
    process.exit(0)
}

function all() {
    console.log('generate all data')
    process.exit(0)
}