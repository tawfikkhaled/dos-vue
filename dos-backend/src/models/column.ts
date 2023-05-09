export default class Column {
  name: string;
  type: string;
  format(value: any): string {
    switch (this.type) {
      case "string":
        return value.toString();
      case "boolean":
        return value.toString();
      case "number":
        return `'${value.toString()}'`;
      case "number[]":
        return `'${value.toString()}'`;
    }
  }
}
