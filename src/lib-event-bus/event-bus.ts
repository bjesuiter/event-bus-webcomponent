import { filter, Observable, Subject, Subscription } from "rxjs";
import { EventBusCallback } from "./types/event-bus-callback";
import { EventBusErrorCallback } from "./types/event-bus-error-callback";
import { TypeDiscriminator } from "./types/type-discriminator";
import { defaultErrorCallback } from "./utils/default-error-callback";

export class EventBus {
  private eventStream: Subject<unknown> = new Subject<unknown>();

  constructor() {
  }

  // --- PUBLIC FUNCTIONS ---

  /**
   * I filter the event stream to get only events of one type as observable
   * @param typeFilter The event type to listen to
   * @returns
   */
  public on$<T>(typeFilter: TypeDiscriminator<T>): Observable<T> {
    return this.eventStream.pipe(
      filter((event: any): boolean => {
        return event instanceof typeFilter;
      }),
    );
  }

  /**
   * I push the given event onto the message bus.
   *
   * @param event
   */
  public emit(event: unknown): void {
    this.eventStream.next(event);
  }
}
