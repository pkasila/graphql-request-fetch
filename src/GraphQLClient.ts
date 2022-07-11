import type {
  GraphQLError,
  GraphQLResponse,
  Headers as HttpHeaders,
  Options,
  RequestOptions,
  Variables,
} from './types';
import { ClientError } from './types';

const cache: Cache | undefined = caches?.default;

export class GraphQLClient {
  private readonly url: string;
  private readonly options: Options;

  constructor(url: string, options?: Options) {
    this.url = url;
    this.options = options || {};
  }

  async rawRequest<T extends any>(
    query: string,
    variables?: Variables,
    options: RequestOptions = {
      cache: false,
    }
  ): Promise<{
    data?: T;
    extensions?: any;
    headers: Headers;
    status: number;
    errors?: GraphQLError[];
  }> {
    if (options.cache && !options.cacheKey) {
      throw new Error(
        'GraphQLClient request: cache is set true but no cacheKey is specified.'
      );
    }

    if (options.cache && !options.cacheTtl) {
      throw new Error(
        'GraphQLClient request: cache is set true but no cacheTtl is specified.'
      );
    }

    const { headers, ...others } = this.options;

    const body = JSON.stringify({
      query,
      variables: variables ? variables : undefined,
    });

    let response: Response | undefined;

    if (
      options.cache &&
      cache !== undefined &&
      options.cacheKey !== undefined
    ) {
      response = await cache.match(options.cacheKey);

      if (!response) {
        response = await fetch(this.url, {
          method: 'POST',
          headers: Object.assign(
            { 'Content-Type': 'application/json' },
            headers
          ),
          body,
          ...others,
        });
        response = new Response(response.body, response);
        if (response.headers.has('Cache-Control') && options.cacheOverride) {
          response.headers.set(
            'Cache-Control',
            `${options.cacheType ?? 'public'}, max-age=${options.cacheTtl ?? 0}`
          );
        } else {
          response.headers.append(
            'Cache-Control',
            `${options.cacheType ?? 'public'}, max-age=${options.cacheTtl ?? 0}`
          );
        }
        await cache.put(options.cacheKey, response.clone());
      }
    } else {
      response = await fetch(this.url, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
        body,
        ...others,
      });
    }

    const result = await this.getResult(response);

    if (
      typeof result !== 'string' &&
      response.ok &&
      !result.errors &&
      result.data
    ) {
      const { headers, status } = response;
      return { ...result, headers, status };
    } else {
      const errorResult =
        typeof result === 'string' ? { error: result } : result;
      throw new ClientError(
        { ...errorResult, status: response.status, headers: response.headers },
        { query, variables }
      );
    }
  }

  async request<T extends any>(
    query: string,
    variables?: Variables,
    options: RequestOptions = {
      cache: false,
    }
  ): Promise<T> {
    const { data } = await this.rawRequest<T>(query, variables, options);

    // we cast data to T here as it will be defined. otherwise there would be an error thrown already in the raw request
    return data as T;
  }

  setHeaders(headers: HttpHeaders): GraphQLClient {
    this.options.headers = headers;

    return this;
  }

  setHeader(key: string, value: string): GraphQLClient {
    const { headers } = this.options;

    if (headers) {
      headers[key] = value;
    } else {
      this.options.headers = { [key]: value };
    }
    return this;
  }

  async getResult(response: Response): Promise<GraphQLResponse | string> {
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.startsWith('application/json')) {
      const graphQLResponse: GraphQLResponse = await response.json();
      return graphQLResponse;
    } else {
      return await response.text();
    }
  }
}
