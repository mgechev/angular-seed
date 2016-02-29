import {LoginService} from './services/login.service';
import {UserAuthorizationService} from './services/user-authorization.service';
import {ApplicationInfoService} from './services/application-info.service';

export const BACKEND_PROVIDERS:Array<any> = [
  LoginService,
  UserAuthorizationService,
  ApplicationInfoService
];
