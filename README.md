# @pkasila/graphql-request-fetch

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> Simple fetch-based GraphQL Client

## Install

```bash
npm install @pkasila/graphql-request-fetch
```

## Usage

### Quickstart

```ts
import { request } from '@pkasila/graphql-request-fetch';

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`

request('https://api.graph.cool/simple/v1/movies', query).then(data =>
  console.log(data)
)
```

### Static function and GraphQLClient

```ts
import { request, GraphQLClient } from '@pkasila/graphql-request-fetch'

// Run GraphQL queries/mutations using a static function:
request(endpoint, query, variables).then(data => console.log(data))

// Also, you can create GraphQLClient on your own and specify headers:
const client = new GraphQLClient(endpoint, { headers: {} })
client.request(query, variables).then(data => console.log(data))
```

### Receiving a raw response

```ts
import { rawRequest } from '@pkasila/graphql-request-fetch'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const query = `
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }
  `

  const { data, errors, extensions, headers, status } = await rawRequest(
    endpoint,
    query
  )
  console.log(
    JSON.stringify({ data, errors, extensions, headers, status }, undefined, 2)
  )
}

main().catch(error => console.error(error))
```

### Use Cloudflare Cache API

```ts
import { request } from '@pkasila/graphql-request-fetch'

async function main() {
  const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

  const query = `
    {
      Movie(title: "Inception") {
        releaseDate
        actors {
          fullname # "Cannot query field 'fullname' on type 'Actor'. Did you mean 'name'?"
        }
      }
    }
  `

  try {
    const data = await request(endpoint, query, {
      cache: true, 
      cacheKey: 'https://cache.yourdomain.com/something', 
      cacheTtl: 300
    });
    console.log(JSON.stringify(data, undefined, 2))
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2))
    process.exit(1)
  }
}

main().catch(error => console.error(error))
```

[build-img]:https://github.com/pkasila/graphql-request-fetch/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/pkasila/graphql-request-fetch/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/@pkasila/graphql-request-fetch
[downloads-url]:https://www.npmtrends.com/@pkasila/graphql-request-fetch
[npm-img]:https://img.shields.io/npm/v/@pkasila/graphql-request-fetch
[npm-url]:https://www.npmjs.com/package/@pkasila/graphql-request-fetch
[issues-img]:https://img.shields.io/github/issues/pkasila/graphql-request-fetch
[issues-url]:https://github.com/pkasila/graphql-request-fetch/issues
[codecov-img]:https://codecov.io/gh/pkasila/graphql-request-fetch/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/pkasila/graphql-request-fetch
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
