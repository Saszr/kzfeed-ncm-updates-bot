const axios = require("axios");

const utils = require("../utils");
const config = require("../config");

let JOB_ID_LIST = [];
let JOB_LIST = [];
let JOB_CACHE_LIST = [];

module.exports = async () => {
  let jobData = await utils.readJob();
  let cacheData = await utils.readCache();
  JOB_ID_LIST = jobData.JOB_ID_LIST;
  JOB_LIST = jobData.JOB_LIST;
  JOB_CACHE_LIST = cacheData.JOB_CACHE_LIST;
  axios
    .get(config.GET_JOB_URL)
    .then(response => {
      // 新建一个cache相关的对象
      let JOB_CACHE_OBJECT = {};
      JOB_CACHE_OBJECT.job_id = response.data.job.job_id;
      JOB_CACHE_OBJECT.cache = response.data.cache;
      // 任务在数组中的index
      let job_id_index = JOB_ID_LIST.findIndex(function(value) {
        return value === response.data.job.job_id;
      });
      if (job_id_index === -1) {
        JOB_ID_LIST = [...JOB_ID_LIST, response.data.job.job_id];
        JOB_LIST = [...JOB_LIST, response.data.job];
        utils.writeJob(JOB_ID_LIST, JOB_LIST);
        JOB_CACHE_LIST = [...JOB_CACHE_LIST, JOB_CACHE_OBJECT];
        utils.writeCache(JOB_CACHE_LIST);
      } else {
        // 存在 job_id，进行替换
        JOB_CACHE_LIST.splice(job_id_index, 1, JOB_CACHE_OBJECT);
        utils.writeCache(JOB_CACHE_LIST);
      }
    })
    .catch(error => {
      console.log(error);
    });
};
