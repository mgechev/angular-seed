import {EntityDto} from './base/entity-dto';
import {TenantLoginDto} from './tenant-login-dto';
import {AttachmentFileDto} from './attachment-file-dto';

export class SuperUserLoginDto extends EntityDto {
  public loginname:string = undefined;
  public firstname:string = undefined;
  public middlename:string = undefined;
  public lastname:string = undefined;
  public tenant:TenantLoginDto = undefined;
  public fullname:string = undefined;
  public requiresNewPassword:boolean = undefined;
  public businessLanguage:string = undefined;
  public traceUntilDate:string = undefined;
  public email:string = undefined;
  public phone:string = undefined;
  public department:string = undefined;
  public attachmentFile:AttachmentFileDto = undefined;
  public accountCreationDate:string = undefined;
  public lastStatusChangeDate:string = undefined;
  public lastLoginDate:string = undefined;
  public tracing:boolean = undefined;
  public userMayChangePassword:boolean = undefined;
  public organization:string = undefined;
  public language:string = undefined;
  public location:string = undefined;
}
