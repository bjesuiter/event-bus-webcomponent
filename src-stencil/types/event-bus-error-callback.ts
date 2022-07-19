/**
 * Is called 'CallbackFunction' in original article
 */
export interface EventBusErrorCallback<T = any> {
  (error: T): void;
}
