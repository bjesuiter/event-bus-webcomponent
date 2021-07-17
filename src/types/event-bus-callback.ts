/**
 * Is called 'CallbackFunction' in original article
 */
export interface EventBusCallback<T = any> {
  (event: T): void;
}
