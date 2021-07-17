import { Component, h, Method } from '@stencil/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TypeDiscriminator } from '../../types/type-discriminator';
import { EventBusCallback } from '../../types/event-bus-callback';
import { defaultErrorCallback } from '../../utils/default-error-callback';
import { EventBusErrorCallback } from '../../types/event-bus-error-callback';

@Component({
  tag: 'event-bus',
  styleUrl: 'event-bus.scss',
  shadow: true,
})
export class EventBus {
  private eventStream: Subject<any>;
  private errorCallback: EventBusErrorCallback = defaultErrorCallback;

  constructor() {
    this.eventStream = new Subject();
  }

  render() {
    return <div style={{ visibility: 'hidden' }}></div>;
  }

  /**
   * I filter the event stream to get only events of one type as observable
   * @param typeFilter The event type to listen to
   * @returns
   */
  private on$<T>(typeFilter: TypeDiscriminator<T>): Observable<T> {
    return this.eventStream.pipe(
      filter((event: any): boolean => {
        return event instanceof typeFilter;
      }),
    );
  }

  // PUBLIC FUNCTIONS:

  /**
   * Replaces the default error callback function with a custom one
   */
  @Method()
  public async setDefaultErrorCallback(callback: EventBusErrorCallback): Promise<void> {
    this.errorCallback = callback;
  }

  /**
   * I push the given event onto the message bus.
   *
   * Note: Public methods in stencil elements need to be async by definition!
   * @param event
   */
  @Method()
  public async emit(event: any): Promise<void> {
    this.eventStream.next(event);
  }

  /**
   * I subscribe to the message bus, but only invoke the callback when the event is
   * of the given newable type (ie, it's a Class definition, not an instance).
   * --
   * NOTE: The NewableType<T> will allow for Type inference.
   *
   * @param typeFilter
   * @param callback
   * @param callbackContext
   * @returns
   */
  @Method()
  public async on<T>(typeFilter: TypeDiscriminator<T>, callback: EventBusCallback<T>, callbackContext: any = null, errorCallback?: EventBusErrorCallback): Promise<Subscription> {
    const subscription = this.on$(typeFilter).subscribe((event: T): void => {
      try {
        callback.call(callbackContext, event);
      } catch (error) {
        if (errorCallback) {
          errorCallback.call(callbackContext, errorCallback);
          return;
        }

        this.errorCallback.call(callbackContext, error);
      }
    });

    return subscription;
  }

  /**
   *
   * @returns the complete eventStream as observable inside a promise
   */
  @Method()
  public async getEventStream(): Promise<Observable<any>> {
    return this.eventStream.asObservable();
  }

  /**
   *
   * @param typeFilter
   * @returns an observable which contains only events of type 'typeFilter'
   */
  @Method()
  public async getEventStreamFor<T>(typeFilter: TypeDiscriminator<T>): Promise<Observable<T>> {
    return this.on$(typeFilter);
  }
}
