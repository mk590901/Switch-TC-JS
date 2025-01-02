//	File switch_reset_helper.mjs automatically generated at 2025-01-02 10:12:32

import {QHsmHelper,ThreadedCodeExecutor} from './tc_core.mjs';

class Switch_resetHelper {
    constructor() {
      this.helper_ = new QHsmHelper('switch');
      this.createHelper();
    }

    //	Transfer functions

    // switchEntry(data) {
    // }

    // switchInit(data) {
    // }

    offEntry(data) {
      console.log('OFF');
    }
  
    offReset(data) {
      console.log('@RESET');
    }
  
    // offExit(data) {
    // }
  
    offTurn(data) {
      console.log('OFF: TURN');
    }
  
    onEntry(data) {
      console.log('ON ');
    }

    // onExit(data) {
    // }
    
    onTurn(data) {
      console.log('ON : TURN');
    }
  
    init() {
      this.helper_.post('init');
    }
  
    run(eventName) {
      this.helper_.post(eventName);
    }
  
    createHelper() {
      this.helper_.insert('switch', 'init', new ThreadedCodeExecutor(this.helper_, 'off', [
        // this.switchEntry,
        // this.switchInit,
        this.offEntry,
      ]));
      this.helper_.insert('off', 'RESET', new ThreadedCodeExecutor(this.helper_, 'off', [
        this.offReset,
        // this.offExit,
        // this.switchInit,
        this.offEntry,
      ]));
      this.helper_.insert('off', 'TURN', new ThreadedCodeExecutor(this.helper_, 'on', [
        this.offTurn,
        this.onEntry,
      ]));
      this.helper_.insert('on', 'RESET', new ThreadedCodeExecutor(this.helper_, 'off', [
        this.offReset,
        // this.onExit,
        // this.offExit,
        // this.switchInit,
        this.offEntry,
      ]));
      this.helper_.insert('on', 'TURN', new ThreadedCodeExecutor(this.helper_, 'off', [
        this.onTurn,
        // this.onExit,
        // this.offExit,
        // this.switchInit,
        this.offEntry,
      ]));
    }
  }
  
  export default Switch_resetHelper;
