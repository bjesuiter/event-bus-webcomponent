import { Subscription } from "rxjs";
import { EventBus } from "./event-bus";

/**
 * An EventBusGroup allows for using the event bus with a Callback-Interface.
 * The this.on() method allows to register a callback to a certain event type.
 * The rxjs subscription on the EventBus, which is made during the callback registration,
 * will be stored inside the EventBusGroup.
 * This allows for unsubscribing all callback subscriptions at once
 */
export class EventBusGroup {
  private subscriptions: Subscription[] = [];

  constructor(private bus: EventBus) {
  }

  public unsubscribeAll() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
