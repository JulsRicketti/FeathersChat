const path = require ('path');
const watch = require('watch');
const bullseye = require('@gradealabs/bullseye');

const srcDir = path.resolve(__dirname, '../src');
const serverFile = path.join(srcDir, './index.js');
let serverHandle = null;

watch.watchTree(srcDir, function (f, curr, prev) {
  if (typeof f === 'object' && prev === null && curr === null) {
    // Finished walking the tree
    startServer().then((handle)=> {
      serverHandle = handle;
    });
  } else if (prev === null) {
    // f is a new file
    restartServer();
  } else if (curr.nlink === 0) {
    // f was removed
    restartServer();
  } else {
    // f was changed
    restartServer();
  }
});
// all bullseye does is give you a handle which will basically allow you to control
// the server.
function startServer () {
  return bullseye.monitorModule(serverFile, {
    waitForReady: true,
    env: process.env
  });
}

function restartServer() {

  if (serverHandle) {
      console.log('server restarting...', serverHandle);
    serverHandle.restart()
    .then(handle => {
      console.log('server restarted...');
      serverHandle = handle;
    });
  }
}
