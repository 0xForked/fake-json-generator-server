import faker from '@faker-js/faker'

function example() {
    return {
        "name": faker.random.words()
    }
}

export function generateExample(total) {
    return Array.from({ length: total }, example)
}