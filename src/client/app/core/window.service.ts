import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

function _window(PLATFORM_ID: string): any {
  if (isPlatformBrowser(PLATFORM_ID)) {
    // return the global native browser window object
    return window;
  } else {
    // return your fallback for other platforms.
    return {};
  }
}

@Injectable()
export class WindowRef {
  constructor( @Inject(PLATFORM_ID) private PLATFORM_ID: string) { }

  get nativeWindow(): any {
    return _window(this.PLATFORM_ID);
  }
}
