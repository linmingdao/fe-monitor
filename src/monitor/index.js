import { injectJsError } from "./lib/jsError";
import { injectPromiseError } from "./lib/promiseError";
import { injectResourceError } from "./lib/resourceError";
import { injectBlankScreen } from "./lib/blankScreen";
import { injectXhr } from "./lib/xhr";
import { injectTiming } from "./lib/timing";

injectJsError();
injectPromiseError();
injectResourceError();
injectBlankScreen();
injectXhr();
injectTiming();
