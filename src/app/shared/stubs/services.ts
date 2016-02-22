import {UserAuthorizationService} from './services/user-authorization.service';
import {LoginService} from './services/login.service';

export const BACKEND_PROVIDERS:Array<any> = [
  LoginService,
  UserAuthorizationService
];
