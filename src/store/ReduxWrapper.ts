class ReduxWrapper {
  static initialized:boolean = false;
  private store;

  constructor(store:any) {
    this.store = store;
    if (!store) {
      throw new Error('store cannot be undefined. Make sure to pass the redux store as the only argument of the constructor.');
    }
    if (ReduxWrapper.initialized) {
      throw new Error('Only one redux store can exist per application.');
    }
    ReduxWrapper.initialized = true;
  }

  getState() {
    return this.store.getState();
  }

  dispatch(action) {
    return this.store.dispatch(action);
  }

  subscribe(listener) {
    var _this = this;
    return this.store.subscribe(function () {
      return listener(_this.getState());
    });
  }
}

export{ReduxWrapper}

