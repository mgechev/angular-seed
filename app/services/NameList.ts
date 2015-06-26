export class NamesList {
  names = ['Dijkstra', 'Knuth', 'Turing', 'Hopper'];

  get() {
    return this.names;
  }
  add(value: string) {
    this.names.push(value);
  }
}
