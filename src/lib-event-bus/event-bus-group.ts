import { Subscription } from "rxjs";
import { EventBus } from "./event-bus";
import { EventBusCallback } from "./types/event-bus-callback";
import { EventBusErrorCallback } from "./types/event-bus-error-callback";
import { TypeDiscriminator } from "./types/type-discriminator";
import { defaultErrorCallback } from "./utils/default-error-callback";

/**
 * An EventBusGroup allows for using the event bus with a Callback-Interface.
 * The this.on() method allows to register a callback to a certain event type.
 * The rxjs subscription on the EventBus, which is made during the callback registration,
 * will be stored inside the EventBusGroup.
 * This allows for unsubscribing all callback subscriptions at once
 */
export class EventBusGroup {
  private subscriptions: Subscription[] = [];

  constructor(
    private bus: EventBus,
    private errorCallback: EventBusErrorCallback = defaultErrorCallback,
  ) {
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
  public on<T>(
    typeFilter: TypeDiscriminator<T>,
    callback: EventBusCallback<T>,
    callbackContext: any = null,
    errorCallback?: EventBusErrorCallback,
  ): void {
    const sub = this.bus.on$(typeFilter).subscribe(
      (event: T): void => {
        try {
          callback.call(callbackContext, event);
        } catch (error) {
          if (errorCallback) {
            errorCallback.call(callbackContext, errorCallback);
            return;
          }

          this.errorCallback.call(callbackContext, error);
        }
      },
    );

    this.subscriptions.push(sub);
  }

  public unsubscribeAll() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
