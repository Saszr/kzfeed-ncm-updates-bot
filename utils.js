const path = require("path");
const fs = require("fs-extra");

// 数据目录
this.dataPath = path.resolve(__dirname, "./data");
this.dataJobPath = path.join(this.dataPath, "./job.json");
this.dataCachePath = path.join(this.dataPath, "./cache.json");

const readJob = async () => {
  try {
    return await fs.readJson(this.dataJobPath);
  } catch (err) {
    console.error(err);
  }
};

const writeJob = async (job_id_list, job_list) => {
  try {
    await fs.writeJson(this.dataJobPath, {
      JOB_ID_LIST: job_id_list,
      JOB_LIST: job_list
    });
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
};

const readCache = async () => {
  try {
    return await fs.readJson(this.dataCachePath);
  } catch (err) {
    console.error(err);
  }
};

const writeCache = async job_cache_list => {
  try {
    await fs.writeJson(this.dataCachePath, {
      JOB_CACHE_LIST: job_cache_list
    });
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { readJob, writeJob, readCache, writeCache };
