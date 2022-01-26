import fs from 'fs'
import path from 'path'

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
        // generateAllData()
    }

    console.log(`just generate specified data  ${argv[1]}`)
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
    const collectionWordsToReplace = [
        `${collection}`,
        `generate${ucword(collection)}`,
        `${collection}`
    ]

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
    console.log(dataGenRows)
    dataGenRows.unshift(`import { generate${ucword(collection)} } from '../collections/${collection}.mjs'`);
    dataGenRows.splice(-2, 0, `\tgenerate${ucword(collection)}(5)`)
    fs.writeFileSync(dataGenPath, dataGenRows.join('\n'));
}

function ucword(str){
    str = str.toLowerCase().replace(
        /(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function(replace_latter)
    {
        return replace_latter.toUpperCase();
    })

    return str
}