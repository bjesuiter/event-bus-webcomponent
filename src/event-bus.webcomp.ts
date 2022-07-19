import { Roarr as logger } from "roarr";

export class EventBusWebcomp extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    // Inner Shadow Dom
    const p = document.createElement("p");
    p.textContent = "Hello World!";
    this.shadow.appendChild(p);
  }

  connectedCallback() {
    logger.info({ id: this.id }, "Event-Bus connected to the dom");
  }

  disconnectedCallback() {
    logger.info({ id: this.id }, "Event-Bus disconnected from the dom");
  }

  attributeChangedCallback(
    name: string,
    oldVal: string,
    newVal: string,
  ) {
    logger.trace(
      { id: this.id },
      "Event-Bus attribute '%s' changed from '%s' to %s",
      name,
      oldVal,
      newVal,
    );
  }

  adoptedCallback() {
    logger.trace({ id: this.id }, "Event-Bus Adopted onto a new page");
  }
}
