import * as logdown from "logdown";
export const logger = logdown(`[event-bus-webcomponent]`);

// TODO: add method for prod builds
// TODO: disable in prod builds!
logger.state.isEnabled = true;
