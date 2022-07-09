import { GraphQLError, Variables } from './types';
import { GraphQLClient } from './GraphQLClient';

export { GraphQLClient } from './GraphQLClient';
export { ClientError } from './types';

export async function rawRequest<T extends any>(
  url: string,
  query: string,
  variables?: Variables
): Promise<{
  data?: T;
  extensions?: any;
  headers: Headers;
  status: number;
  errors?: GraphQLError[];
}> {
  const client = new GraphQLClient(url);

  return client.rawRequest<T>(query, variables);
}

export async function request<T extends any>(
  url: string,
  query: string,
  variables?: Variables
): Promise<T> {
  const client = new GraphQLClient(url);

  return client.request<T>(query, variables);
}

export default request;
