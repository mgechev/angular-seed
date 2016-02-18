/**
 * Function which converts a key-value object (map) to params string (key1=value1&key2=value2).
 *
 * @param source
 * @returns {string}
 */
export function queryParams(source:Object):string
{
  var array:Array<string> = [];

  for (var key in source)
  {
    array.push(encodeURIComponent(key) + '=' + encodeURIComponent(source[key]));
  }

  return array.join('&');
}