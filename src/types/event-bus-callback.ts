export interface EventBusCallback<T = any> {
  (event: T): void;
}
