import brand from '../features/brands/index.mjs'
import categories from '../features/categories/index.mjs'
import products from '../features/products/index.mjs'
import services from '../features/services/index.mjs'
import tags from '../features/tags/index.mjs'
import units from '../features/units/index.mjs'
import wishlists from '../features/wishlists/index.mjs'

export default function routes (app) {
    brand(app)
    categories(app)
    products(app)
    services(app)
    tags(app)
    units(app)
    wishlists(app)
}
