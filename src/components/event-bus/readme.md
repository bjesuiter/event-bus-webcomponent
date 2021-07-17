# event-bus



<!-- Auto Generated Below -->


## Methods

### `emit(event: any) => Promise<void>`

I push the given event onto the message bus.

Note: Public methods in stencil elements need to be async by definition!

#### Returns

Type: `Promise<void>`



### `getEventStream() => Promise<Observable<any>>`



#### Returns

Type: `Promise<Observable<any>>`



### `getEventStreamFor<T>(typeFilter: TypeDiscriminator<T>) => Promise<Observable<T>>`



#### Returns

Type: `Promise<Observable<T>>`



### `on<T>(typeFilter: TypeDiscriminator<T>, callback: EventBusCallback<T>, callbackContext?: any, errorCallback?: EventBusErrorCallback) => Promise<Subscription>`

I subscribe to the message bus, but only invoke the callback when the event is
of the given newable type (ie, it's a Class definition, not an instance).
--
NOTE: The NewableType<T> will allow for Type inference.

#### Returns

Type: `Promise<Subscription>`



### `setDefaultErrorCallback(callback: EventBusErrorCallback) => Promise<void>`

Replaces the default error callback function with a custom one

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
