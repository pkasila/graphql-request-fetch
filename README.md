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

## API

### `GraphQLClient`

#### `constructor(url: string, options?: Options)`

Constructs a new `GraphQLClient`

* `url` - a GraphQL endpoint
* `options` - options to query the GraphQL endpoint

#### `rawRequest(query: string, variables?: Variables, options: RequestOptions)`

Allows you to send a request and get a raw response.

* `query` - a query to be sent to the GraphQL endpoint
* `variables` - a dictionary of variables to be used with the query
* `options` - caching options

#### `request(query: string, variables?: Variables, options: RequestOptions)`

Wraps `rawRequest` and returns `data` from the query response.

* `query` - a query to be sent to the GraphQL endpoint
* `variables` - a dictionary of variables to be used with the query
* `options` - caching options

### Types

#### `Options`

Refer to `RequestInit`'s documentation.

#### `RequestOptions`

Specifies caching options for the response.

* `cache` - is caching?
* `cacheKey` (required if caching) - key for the Cache API
* `cacheTtl` (required if caching) - TTL for the Cache API
* `cacheType` (defaults to `public`) - cache-control: `public` or `private`
* `cacheOverride` (defaults to `false`) - whether overrides server's `Cache-Control` header

### Static functions (`request`, `rawRequest`)

Sometimes you just want to make GraphQL requests without any need in a custom `GraphQLClient`.
`@pkasila/graphql-request-fetch` lets you use it that way using static functions. They will
create `GraphQLClient` on their own.

To call them, you just need to specify your GraphQL endpoint first and then follow the same
call as from `GraphQLClient.request` and `GraphQLClient.rawRequest`.

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
