class QHsmHelper {
  constructor(state) {
    this._state = state;
    this.runner = new Runner(this);
    this._container = {};
  }

  insert(state, event, executor) {
    this._container[createKey(state, event)] = executor;
  }

  post(event, data) {
    this.runner.post(event, data);
  }

  executor(event) {
    const key = createKey(this._state, event);
    if (!this._container.hasOwnProperty(key)) {
      console.log(`runSync.error: ${this._state}->${event}`);
      return null;
    }
    const executor = this._container[key];
    return executor;
  }

  getState() {
    return this._state;
  }

  setState(state) {
    this._state = state;
  }
}

class EventWrapper {
  constructor(event, data) {
    this._event = event;
    this._data = data;
  }

  data() {
    return this._data;
  }

  event() {
    return this._event;
  }
}

class Runner {
  constructor(helper) {
    this._eventsQueue = [];
    this._helper = helper;
  }

  post(event, data) {
    this._eventsQueue.push(new EventWrapper(event, data));
    while (this._eventsQueue.length > 0) {
      const eventWrapper = this._eventsQueue.shift();
      const executor = this._helper.executor(eventWrapper.event());
      executor?.executeSync(data);
    }
  }
}

class ThreadedCodeExecutor {
  constructor(helper, targetState, functions) {
    this._helper = helper;
    this._targetState = targetState;
    this._functions = functions;
    this.runner = new Runner(helper);
  }

  post(event, data) {
    this.runner.post(event, data);
  }

  executeSync(data) {
    this._helper.setState(this._targetState);
    for (const func of this._functions) {
      func(data);
    }
  }
}

function createKey(s, t) {
  return `${s}.${t}`;
}

export { QHsmHelper, ThreadedCodeExecutor };
