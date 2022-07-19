// export const logger = logdown(`[event-bus-webcomponent]`);
import { ROARR } from "roarr";
import { createLogWriter } from "@roarr/browser-log-writer";

/**
 * Documentation for @roarr/browser-log-writer:
 * https://github.com/gajus/roarr-browser-log-writer
 *
 * > The simplest way to view all logs is to define ROARR_LOG=true
 *
 * How to filter ROARR Logs:
 * > https://github.com/gajus/roarr-browser-log-writer#filtering-logs
 * > By default all logs are displayed. However, you can narrow down logs using a special constant ROARR_FILTER.
 * > The value of ROARR_FILTER is a Liqe query, e.g.
 * > # Only print logs with `context.logLevel` greater than 10.
 * > localStorage.setItem('ROARR_FILTER', 'context.logLevel:>10')
 *
 * > # Only print logs with `context.namepsace` containing "slonik".
 * localStorage.setItem('ROARR_FILTER', 'context.namespace:slonik')
 */
ROARR.write = createLogWriter();

// TODO: add away in the repo for prod builds
// TODO: disable automatic logger enablement in prod builds!
localStorage.setItem("ROARR_LOG", "true");
