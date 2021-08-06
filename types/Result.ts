export default interface Result<T> {
  error?: Error;
  data?: T;
}
