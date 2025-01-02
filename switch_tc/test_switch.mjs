import Switch_resetHelper from './switch_reset_helper.mjs';

function testSwitch() {
    const hsmHelper = new Switch_resetHelper();
    hsmHelper.init();
    hsmHelper.run('TURN');
    hsmHelper.run('RESET');
    hsmHelper.run('TURN');
    hsmHelper.run('TURN');
    hsmHelper.run('RESET');
  }
  
  testSwitch();
  
