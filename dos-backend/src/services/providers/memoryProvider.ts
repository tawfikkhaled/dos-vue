import { DbProvider } from "./dbProvider";

export class MemoryProvider extends DbProvider {
  protected executeNnQuery<T>(query: string): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
}
