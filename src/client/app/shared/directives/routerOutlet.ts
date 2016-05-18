// import { ElementRef, DynamicComponentLoader, Directive, Attribute } from '@angular/core';
// import { Router } from '@angular/router';
// import { RouterOutlet, ComponentInstruction } from '@angular/router-deprecated';
// import { LoginService } from '../services/login.service';

// @Directive({
//     selector: 'router-outlet'
// })
// export class LoggedInRouterOutletDirective extends RouterOutlet {
//     publicRoutes: Array<string>;

//     constructor(
//         _elementRef: ElementRef, _loader: DynamicComponentLoader,
//         _parentRouter: Router, @Attribute('name') nameAttr: string,
//         private userService: LoginService,
//         private router: Router
//     ) {
//         super(_elementRef, _loader, _parentRouter, nameAttr);

//         this.router = _parentRouter;
//         this.publicRoutes = [
//             '', 'login', 'signup'
//         ];
//     }

//     activate(instruction: ComponentInstruction) {
//         if (this._canActivate(instruction.urlPath)) {
//             return super.activate(instruction);
//         }

//         this.router.navigate(['Login']);
//     }

//     _canActivate(url: string) {
//         return this.publicRoutes.indexOf(url) !== -1
//             || this.userService.isAuthenticated();
//     }
// }
