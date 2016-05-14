/**
 * This class provides the NameList service with methods to
 * read names and add names.
 */
export class NameListService {

  /**
   * The array of initial names provided by the service.
   * @type {Array}
   */
  names = [
    'Edsger Dijkstra',
    'Donald Knuth',
    'Alan Turing',
    'Grace Hopper'
  ];

  /**
   * Returns the array of names.
   * @return {string[]} the array of names
   */
  get(): string[] {
    return this.names;
  }

  /**
   * Adds the given name to the array of names.
   * @param {string} value the name to add
   */
  add(value: string): void {
    this.names.push(value);
  }

}
