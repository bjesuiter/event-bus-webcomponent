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
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(
    _name: string,
    _oldValue: string,
    _newValue: string,
  ) {
    console.log("Custom square element attributes changed.");
  }

  adoptedCallback() {
    console.log("Event-Bus.");
  }
}
