const CronJob = require("cron").CronJob;
// const { start } = require("repl");
// const config = require("../config/config");
const { emailService } = require("../services");

/** Send email */
new CronJob(
  "33 6 * * *",
  function () {
    emailService.sendMail(
      "sheladiyavibha0667@gmail.com",
      "Morning message",
      "Good morning vibhu! Have a nice day :)"
    );
  },
  null,
  false,
  "Asia/Kolkata"
).start();
