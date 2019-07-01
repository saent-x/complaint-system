import { createInstance } from "./config";

export default class Logger {
  async log(msg) {
    try {
      return await createInstance().post("/logs", {
        date: new Date().toDateString(),
        message: msg
      });
    } catch (error) {
      return console.log("Unable to send log message: " + error.message);
    }
  }

  async fetchLogs(pageSize, pageNumber) {
    try {
      const url = "/logs";
      return createInstance().get(url);
    } catch (error) {
      return console.log(
        "Unable to fetch audit log messages : " + error.message
      );
    }
  }
}
