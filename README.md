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

### Fake Data

Generate fake data for all collection.

```bash
$ yarn gen fake
```

Generate fake data for specified collection

available options:
1. collection name (required)
2. total number of records (default: 3) (optional)

```bash
$ yarn gen fake {collection} {total}
```