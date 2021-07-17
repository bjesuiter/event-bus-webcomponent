// I am the base-class for all of the events that this application pushes onto the
// MessageQueue. The only guarantee that this class makes is a read-only Type.

export abstract class BusEvent {
  public abstract readonly type: string;
}
