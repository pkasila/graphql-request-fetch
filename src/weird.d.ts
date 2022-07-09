declare interface ErrorConstructor {
  captureStackTrace(thisArg: any, func: any): void;
}

declare interface CacheStorage {
  default: Cache | undefined;
}
