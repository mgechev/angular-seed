import {EntityDto} from './base/entity-dto';

export class SuperAttachmentFileDto extends EntityDto {
  public attachmentCount:number = undefined;
  public sealed:boolean = undefined;
}
