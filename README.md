# Mock Data 

## Start Dev Server

```bash
$ node index.mjs
```

or

```bash
$ yarn dev
```

## Generator


### Scaffolding

Generate stub data for a new collection.

```bash
$ yarn gen scaffold {name}
```
this action will:
1. create a new file in `mock/generator/collections/{name}.mjs`
2. copy stub file in `mock/generator/stubs/{name}.mjs` and create folder in `src/features/{name}`
3. you can update the collection file to add your data model (key, value, etc.)

Generate fake data for a new collection.

```bash
$ yarn gen fake
```

this action will:

1. create json data
2. and you can access it by `http://host:port/scaffold_name`