import { logger } from "./logger";

export class EventBus extends HTMLElement {
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
    logger.info("Connected to the dom: ", this);
  }

  disconnectedCallback() {
    logger.info("Disconnected from the dom: ", this);
  }

  attributeChangedCallback(
    name: string,
    oldVal: string,
    newVal: string,
  ) {
    logger.debug("Attribute changed: ", { name, oldVal, newVal });
  }

  adoptedCallback() {
    logger.debug("Adopted onto a new page.");
  }
}
