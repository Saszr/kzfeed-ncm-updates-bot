// 快知机器人token
const TOKEN = "...";
// 轮询/发送地址
const GET_JOB_URL = "https://kz.sync163.com/bot/" + TOKEN + "/getJob";
const PUSH_MSG_URL = "https://kz.sync163.com/bot/" + TOKEN + "/pushMessage";
// 网易云api地址
const MUSIC_USER_URL = user => {
  return "http://localhost:3000/user/event?uid=" + user + "&limit=1";
};

module.exports = {
  GET_JOB_URL,
  PUSH_MSG_URL,
  MUSIC_USER_URL
};
