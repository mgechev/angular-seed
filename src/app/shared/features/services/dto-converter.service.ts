import {dtos} from '../../stubs/dtos';

/**
 * Static helper service, which converts JSON to typed instances and vice versa.
 */
export class DtoConverter {
  //--------------------------------------------------
  // typify

  /**
   * Typifies any kind of value.
   *
   * @param dumbObject
   * @returns {any}
   */
  public static typify(dumbObject:any):any {
    var typedObject:any;
    if (dumbObject) {
      // is it an object?
      if (typeof dumbObject === 'object') {
        // but it's no array?
        if (!Array.isArray(dumbObject)) {
          typedObject = DtoConverter.typifyObject(dumbObject);
        } else if (Array.isArray(dumbObject)) { // sure, it is an array
          typedObject = DtoConverter.typifyArray(dumbObject);
        }
      } else { // no, it is NOT an object, it's a primitve
        typedObject = DtoConverter.typifyPrimitive(dumbObject);
      }
    }
    return typedObject;
  }

  /**
   * Typifies an object.
   *
   * @param dumbObject
   * @returns {Object}
   */
  public static typifyObject(dumbObject:Object):Object {
    var typedObject:Object;
    var objectIsTyped = false;

    // has it the @type information?
    if (dumbObject && dumbObject.hasOwnProperty('@type')) {
      // is this type already existing?
      if (dtos.hasOwnProperty(dumbObject['@type'])) {
        // use that type!
        typedObject = new dtos[dumbObject['@type']]();

        objectIsTyped = true;
      } else { // no type, but we have lazy developers
        typedObject = {};
      }
      // remove @type information, not needed anymore
      delete dumbObject['@type'];
    } else { // nope, no @type. It stays dumb
      typedObject = {};
    }

    // let's check the properties of the dumb object
    for (var prop in dumbObject) {
      var propValue = dumbObject[prop];

      // if it is a typed object, we only use valid properties. If not, we don't care about the properties
      if (((objectIsTyped && typedObject.hasOwnProperty(prop)) || !objectIsTyped)) {
        typedObject[prop] = DtoConverter.typify(propValue);
      }
      /*///////// dummy /////////
       // if property doesn't exist in typedObject, add a dynamic entry
       else if (objectIsTyped && !typedObject.hasOwnProperty(prop))
       {
       if (!typedObject.__dynamics)
       {
       typedObject.__dynamics = {};
       }
       typedObject.__dynamics[prop] = this.typify(propValue);
       }
       //
       ///////// dummy /////////*/
    }

    return typedObject;
  }

  /**
   * Typifies an Array.
   *
   * @param dumbObject
   * @returns {Array<any>}
   */
  public static typifyArray(dumbObject:Array<any>):Array<any> {
    var typedObject:Array<any> = [];

    // items loop
    dumbObject.forEach(function (dumObjectItem) {
      typedObject.push(DtoConverter.typify(dumObjectItem));
    });

    return typedObject;
  }

  /**
   * Typifies a primitive type.
   *
   * @param dumbObject
   * @returns {any}
   */
  public static typifyPrimitive(dumbObject:any):any {
    var typedObject:any;

    // check if it is a date (dates are represented as strings)
    if (typeof dumbObject === 'string' && !isNaN(Date.parse(dumbObject))) {
      typedObject = new Date(dumbObject);
    } else {
      typedObject = dumbObject;
    }

    return typedObject;
  }

  //--------------------------------------------------
  // dumbify

  /**
   * Dumbifies any kind of value.
   *
   * @param typedObject
   * @returns {any}
   */
  public static dumbify(typedObject:any):any {
    var dumbObject:any;

    // typed object exists?
    if (typedObject !== undefined) {
      // is it an object?
      if (typeof typedObject === 'object') {
        // it is an Array?
        if (Array.isArray(typedObject)) {
          dumbObject = DtoConverter.dumbifyArray(typedObject);
        } else if (typedObject instanceof Date) { // is it a Date?
          dumbObject = DtoConverter.dumbifyDate(typedObject);
        } else { // it is not an Array -> proceed with Object handling
          dumbObject = DtoConverter.dumbifyObject(typedObject);
        }
      } else if (typeof typedObject !== 'function') { // no, it is NOT an object, and no function -> it's a primitve
        dumbObject = DtoConverter.dumbifyPrimitive(typedObject);
      }
    }

    return dumbObject;
  }

  /**
   * Dumbifies an Object
   *
   * @param typedObject
   * @returns {Object}
   */
  public static dumbifyObject(typedObject:any):Object {
    var dumbObject:Object = {};

    // make dumb object an Object

    // check for a non-normal Object
    if (typedObject.constructor.name !== 'Object') {
      dumbObject['@type'] = typedObject.constructor.name;
    }

    // let's check the properties of the typed object
    for (var prop in typedObject) {
      if (prop.indexOf('_') === 0 || prop.indexOf('$') === 0) {
        continue;
      }
      var propValue = typedObject[prop];
      dumbObject[prop] = DtoConverter.dumbify(propValue);
    }

    /*///////// dummy /////////
     // check if dynamics exist
     //
     if (typedObject.hasOwnProperty('__dynamics') && typedObject.__dynamics)
     {
     for (var dynProp in typedObject.__dynamics)
     {
     var dynPropValue = typedObject.__dynamics[dynProp];
     dumbObject[dynProp] = this.dumbify(dynPropValue);
     }
     }
     ///////// dummy /////////*/

    return dumbObject;
  }

  /**
   * Dumbifies an Array.
   *
   * @param typedObject
   * @returns {Array<any>}
   */
  public static dumbifyArray(typedObject:Array<any>):Array<any> {
    // make dumb object an Array too
    var dumbObject:Array<any> = [];

    // loop typed object items
    typedObject.forEach(function (typedObjectItem) {
      // dumbify typed object items and add to dumb object
      dumbObject.push(DtoConverter.dumbify(typedObjectItem));
    });

    return dumbObject;
  }

  /**
   * Dumbifies a Date
   *
   * @param typedObject
   * @returns {string}
   */
  public static dumbifyDate(typedObject:Date):string {
    return typedObject.toISOString();
  }

  /**
   * Dumbifies a primitive types.
   *
   * @param typedObject
   * @returns {any}
   */
  public static dumbifyPrimitive(typedObject:any):any {
    return typedObject;
  }
}
