import {EntityDto} from './base/entity-dto';

export class SuperAuthPermissionDto extends EntityDto {
  public allActions:boolean = undefined;
  public allResources:boolean = undefined;
  public action:string = undefined;
  public description:string = undefined;
  public resource:string = undefined;
}
