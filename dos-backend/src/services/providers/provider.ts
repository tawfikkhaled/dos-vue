import { MemoryProvider } from "./memoryProvider";

export function getDbProvider(name: string) {
  switch (name) {
    default:
      return new MemoryProvider();
  }
}
