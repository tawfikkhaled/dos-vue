export abstract class DbProvider {
  protected abstract executeNnQuery<T>(query: string): Promise<T[]>;
}
