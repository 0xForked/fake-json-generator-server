import example from "../collections/example.mjs";
import product from "../collections/product.mjs";

export async function single(collection, total = 3) {
    console.log(`generate data for ${collection}`)

    const module = await import(`../collections/${collection}.mjs`)
    console.log(module.default(total))

    console.log(`Success Generate ${collection}`)
}

export function all() {
    console.log('generate all data')

    console.log(example(3))
    console.log(product(3))

    console.log('successfully generate all data')
}