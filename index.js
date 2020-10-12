const cron = require("node-cron");
let shell = require("shelljs");
cron.schedule("0 * * * * *", function () {
  if (shell.exec("node backend/app.js").code !== 0) {
    console.log("something went wrong");
  }
});
