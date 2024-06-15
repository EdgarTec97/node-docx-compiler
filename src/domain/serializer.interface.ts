export interface ISerializer<T> {
  render(): Promise<T>;
}
