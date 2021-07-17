/**
 * Is called 'NewableType' in original article
 */
export interface TypeDiscriminator<T> {
  new (...args: any[]): T;
}
