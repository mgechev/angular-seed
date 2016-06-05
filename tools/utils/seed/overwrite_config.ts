export const Overwrite = () => {
  return (classInstance: any, prop: string) => {
    const proto = classInstance.constructor.prototype;
    Object.defineProperty(proto, prop, {
      get() {
        return this['_' + prop] || proto.__proto__[prop];
      },
      set(val: any) {
        this['_' + prop] = val;
      }
    });
  };
};

