import {LoginService} from './services/login.service';
import {UserAuthorizationService} from './services/user-authorization.service';

export const BACKEND_PROVIDERS:Array<any> = [
  LoginService,
  UserAuthorizationService
];
