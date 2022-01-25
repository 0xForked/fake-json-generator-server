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

    copyStub(collection)
    searchReplaceVariable(collection)
}

function copyStub(collection) {
    // copy collection stub
    const collectionStub = path.join(__dirname, 'mock', 'generator', 'stubs', 'collection.mjs.stub')
    const collectionSDest = path.join(__dirname, 'mock', 'collections', `${collection}.mjs`)
    fs.copyFileSync(collectionStub, collectionSDest)

    // create new features directory
    const dir = path.join(__dirname, 'src', 'features', collection)
    fs.mkdirSync(dir, { recursive: true });

    // copy features index file stub
    const featureIndexStub = path.join(__dirname, 'mock', 'generator', 'stubs', 'index.mjs.stub')
    const featureIndexDest = path.join(__dirname, 'src', 'features', collection, 'index.mjs')
    fs.copyFileSync(featureIndexStub, featureIndexDest)

    // copy features list file stub
    const featureListStub = path.join(__dirname, 'mock', 'generator', 'stubs', 'list.mjs.stub')
    const featureListDest = path.join(__dirname, 'src', 'features', collection, 'list.mjs')
    fs.copyFileSync(featureListStub, featureListDest)
}

function searchReplaceVariable(collection) {
    const collectionPath = path.join(__dirname, 'mock', 'collections', `${collection}.mjs`)
    const featureIndexPath = path.join(__dirname, 'src', 'features', collection, 'index.mjs')
    const featureListPath = path.join(__dirname, 'src', 'features', collection, 'list.mjs')

    const collectionFile = fs.createReadStream(collectionPath, 'utf8');
    const featureIndexFile = fs.createReadStream(featureIndexPath, 'utf8');
    const featureListFile = fs.createReadStream(featureListPath, 'utf8');

    let newCollectionReplace = '';
    let newFeatureIndexReplace = '';
    let newFeatureListReplace = '';

    const collectionWordsToReplace = [
        `${collection}`,
        `generate${ucword(collection)}`,
        `${collection}`
    ]
    const featureWordsToReplaceInIndex = [`${collection}`]
    const featureWordsToReplaceInList = [
        `${collection}`, `${collection}`, `${collection}`,
        `${collection}`, `${collection}`, `${collection}`,
    ]

    collectionFile.on('data', function (data) {
        newCollectionReplace += collectionWordsToReplace.reduce(
            (f, s, i) => `${f}`.replace(`{${i}}`, s),
            data
        )
    })

    featureIndexFile.on('data', function (data) {
        newFeatureIndexReplace += featureWordsToReplaceInIndex.reduce(
            (f, s, i) => `${f}`.replace(`{${i}}`, s),
            data
        )
    })

    featureListFile.on('data', function (data) {
        newFeatureListReplace += featureWordsToReplaceInList.reduce(
            (f, s, i) => `${f}`.replace(`{${i}}`, s),
            data
        )
    })

    collectionFile.on('end', function () {
        fs.writeFileSync(collectionPath, newCollectionReplace)
    })

    featureIndexFile.on('end', function () {
        fs.writeFileSync(featureIndexPath, newFeatureIndexReplace)
    })

    featureListFile.on('end', function () {
        fs.writeFileSync(featureListPath, newFeatureListReplace)
    })
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