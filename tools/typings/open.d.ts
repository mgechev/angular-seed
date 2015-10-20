// https://github.com/borisyankov/DefinitelyTyped/tree/master/open
// Does not support ES2015 import (import * as open from 'open').

declare module 'open' {
	function open(target: string, app?: string): void;
  module open {}
	export = open;
}
