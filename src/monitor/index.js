import { injectJsError } from "./lib/jsError";
import { injectPromiseError } from "./lib/promiseError";
import { injectResourceError } from "./lib/resourceError";

injectJsError();
injectPromiseError();
injectResourceError();
