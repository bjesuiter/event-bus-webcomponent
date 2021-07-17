import { Component, h } from '@stencil/core';

@Component({
  tag: 'event-bus',
  styleUrl: 'event-bus.scss',
  shadow: true,
})
export class EventBus {
  render() {
    return <div style={{ visibility: 'hidden' }}></div>;
  }
}
