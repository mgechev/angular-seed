import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import {
  async
} from '@angular/core/testing';
import {
  Route
} from '@angular/router';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { NavbarComponent } from './core/navbar/navbar.component';

export function main() {

  describe('App component', () => {

    const config: Route[] = [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent }
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, RouterTestingModule.withRoutes(config)],
        declarations: [TestComponent, ToolbarComponent,
          NavbarComponent, AppComponent,
          HomeComponent, AboutComponent],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' }
        ]
      });
    });

    it('should build without a problem',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            const fixture = TestBed.createComponent(TestComponent);
            const compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>'
})

class TestComponent {
}



