import fs from 'fs'
import path from 'path'
import { single as singleCollection, all as allCollection } from './data.mjs'

global.__dirname = process.cwd()

const scaffold = 'scaffold'
const fake = 'fake'

let argv = (process.argv.slice(2).toString().split(','));

if (argv[0] === scaffold) {
    console.log("generate new scaffold")

    if (!argv[1]) {
        console.log("Please provide a name for the scaffold ")
        process.exit(0)
    }

    const collection = argv[1]

    makeNewFromStub(collection)
    replaceStubVar(collection)
    registerCollection(collection)

    console.log(`collection ${argv[1]} successfully created!`)
    console.log(`You can edit the data model at ${path.join(__dirname, 'data', collection+'.mjs' )}`)
}

if (argv[0] === fake) {
    if (! argv[1]) {
        await allCollection()
    }

    await singleCollection(argv[1], argv[2])
}

function makeNewFromStub(collection) {
    // generate new collection
    const collectionStub = path.join(__dirname, 'mock', 'generator', 'stubs', 'collection.mjs.stub')
    const collectionSDest = path.join(__dirname, 'mock', 'collections', `${collection}.mjs`)

    if(fs.existsSync(collectionSDest)) {
        console.log(`collection ${collection} was exists`)
        process.exit(0)
    }

    fs.copyFileSync(collectionStub, collectionSDest)
}

function replaceStubVar(collection) {
    // update collection variable
    const collectionPath = path.join(__dirname, 'mock', 'collections', `${collection}.mjs`)
    const collectionFile = fs.createReadStream(collectionPath, 'utf8');
    const collectionWordsToReplace = [`${collection}`, `${collection}`, `${collection}`]
    let newCollectionReplace = '';

    collectionFile.on('data', function (data) {
        newCollectionReplace += collectionWordsToReplace.reduce(
            (f, s, i) => `${f}`.replace(`{${i}}`, s),
            data
        )
    })

    collectionFile.on('end',  () => { fs.writeFileSync(collectionPath, newCollectionReplace) })
}

function registerCollection(collection) {
    // add to data generator
    let dataGenPath = path.join(__dirname, 'mock', 'generator', 'data.mjs')
    let dataGenRows = fs.readFileSync(dataGenPath).toString().split('\n');
    dataGenRows.unshift(`import ${collection} from '../collections/${collection}.mjs'`);
    dataGenRows.splice(-4, 0, `\tconsole.log(${collection}(3))`)
    fs.writeFileSync(dataGenPath, dataGenRows.join('\n'));
}
