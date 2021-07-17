# Event Bus Webcomponent

> Original Stencil Readme: [./stencil-readme.md](./stencil-readme.md)

This webcomponent is intended as dom-based event bus with TypeScript save events.

## Reason

Exchanging messages between angular elements (angular custom elements wit @angular/elements package) and their angular host applications is suprisingly hard.

Ideas and their shortcommings:

- Using the angular injector from host app in angular element to exchange services:  
  not easy/impossible, since an angular custom element project does not have access to the injector of the app where the webcomp will be running in.
- Using any third party javascript event bus library:
  - can only act on distinct strings on the event bus, not on on typescript types (which would be nice for typed payloads in typescript!)
  - do mostly not have any typescript typing for their own (for the third-party event bus library)
- Using a class with rxJS Subject:  
  Fails due to module scoping of Webpack. If you try to pass an imaginary 'EventBus' object from the main Angular app to an angular elements webcomponent,
  the events that you emit in the host app can't be seen in the angular elements webcomponent
- Putting the imaginary 'EventBus' class into a global wariable (like window.EventBus):  
  This feels not ok, since it would pollute the global namespace again

=> My solution:

Write a custom html element called: event-bus-webcomponent, which can be queried using document.getElementByName, document.querySelector, etc.
It then provides some methods, which can be called from outside, which basically is the same as having a global variable now.
This would also allow the user to provide multiple distinct event busses by instantiating multiple of these elements on the page with different id-attributes, for example.

## Attributions

- Base system idea: https://www.bennadel.com/blog/3518-trying-to-create-a-message-bus-using-an-rxjs-subject-in-angular-6-1-10.htm
