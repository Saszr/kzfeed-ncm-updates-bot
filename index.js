const schedule = require("node-schedule");

const job = require("./models/job");
const handler = require("./models/handler");

scheduleTask = () => {
  schedule.scheduleJob("10 * * * * *", function() {
    job();
    console.log("job():" + new Date());
  });
  schedule.scheduleJob("0 * * * * *", function() {
    handler();
    console.log("handler():" + new Date());
  });
};

scheduleTask();
