const axios = require("axios");

const utils = require("../utils");
const config = require("../config");
const push = require("./push");

let JOB_LIST = [];
let JOB_CACHE_LIST = [];

const judgeCache = (JOB_ID, response) => {
  let msg = JSON.parse(response.data.events[0].json).msg;
  let cache = { msg };
  let old_cache = JOB_CACHE_LIST.find(function(value) {
    return value.job_id === JOB_ID;
  }).cache;
  if (old_cache.msg == cache.msg) {
    console.log("动态未更新");
  } else {
    push(JOB_ID, msg, cache);
  }
};

module.exports = async () => {
  let jobData = await utils.readJob();
  let cacheData = await utils.readCache();
  JOB_LIST = jobData.JOB_LIST;
  JOB_CACHE_LIST = cacheData.JOB_CACHE_LIST;
  for (let i = 0; i < JOB_LIST.length; i++) {
    let url = config.MUSIC_USER_URL(JOB_LIST[i].params.user);
    let JOB_ID = JOB_LIST[i].job_id;
    axios
      .get(url)
      .then(response => {
        judgeCache(JOB_ID, response);
      })
      .catch(error => {
        // console.log(error);
      });
  }
};
