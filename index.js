let shell = require("shelljs");
const cron = require("node-cron");
console.log("hello");
cron.schedule("10 * * * * *", function () {
  if (shell.exec("node app.js").code !== 0) {
    console.log("something went wrong");
  }
});
