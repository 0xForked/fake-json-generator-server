import faker from '@faker-js/faker'

function product() {
    return {
        _id: faker.datatype.uuid(),
        category_id: "",
        brand_id: "",
        unit_id: "",
        service_id: "",
        tag_id: "",
        product_name: faker.random.word(),
        product_description: faker.random.words(),
        product_rx: "",
        product_price: "",
        product_stock: "",
        product_weight: "",
        product_size: "",
        product_sku: "",
        product_type: "",
        product_safety_information: "",
        product_note: "",
        product_variable_option: "",
        active: "",
        audit: []
    }
}

export function generateProduct(total) {
    return Array.from({ length: total }, product)
}