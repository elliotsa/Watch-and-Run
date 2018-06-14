const fs = require('fs');
const { spawn } = require('child_process');

let proc = {};
const command = process.argv[2];
createChild(proc, command);

fs.watch(
  '.',
  {
    recursive: true,
  },
  (eventType, filename) => {
    console.log('Process restarting');
    restartChild(proc, command);
    console.log(`This happened: ${eventType}, at this location ${filename}`);
  },
);

process.on('SIGINT', onExit);
process.on('exit', onExit);

function onExit() {
  console.log('Process exit');
  killChild(proc);
  process.exit(0);
}

function createChild(list, command) {
  list.child = spawn(command);
  setListeners(list.child);
}

function killChild(list) {
  list.child.kill('SIGINT');
}

function restartChild(list, command) {
  killChild(list);
  createChild(list, command);
}

function setListeners(child) {
  child.stdout.on('data', data => console.log(data.toString()));
  child.stderr.on('data', data => console.log(data.toString()));
}
