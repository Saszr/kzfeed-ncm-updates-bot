const axios = require("axios");

const utils = require("../utils");
const config = require("../config");

let JOB_ID_LIST = [];
let JOB_CACHE_LIST = [];

module.exports = async (JOB_ID, msg, cache) => {
  let jobData = await utils.readJob();
  let cacheData = await utils.readCache();
  JOB_ID_LIST = jobData.JOB_ID_LIST;
  JOB_CACHE_LIST = cacheData.JOB_CACHE_LIST;
  axios({
    method: "post",
    url: config.PUSH_MSG_URL,
    data: {
      job_id: JOB_ID,
      cards: [
        {
          title: "网易云动态测试标题",
          text: msg
        }
      ],
      cache: cache
    }
  })
    .then(response => {
      console.log(response.data);
      if (response.data.errno === 0) {
        // 新建一个cache相关的对象
        let JOB_CACHE_OBJECT = {};
        JOB_CACHE_OBJECT.job_id = JOB_ID;
        JOB_CACHE_OBJECT.cache = cache;
        // 任务在数组中的index
        let job_id_index = JOB_ID_LIST.findIndex(function(value) {
          return value === JOB_ID;
        });
        JOB_CACHE_LIST.splice(job_id_index, 1, JOB_CACHE_OBJECT);
        utils.writeCache(JOB_CACHE_LIST);
      }
    })
    .catch(error => {
      console.log(error);
    });
};
