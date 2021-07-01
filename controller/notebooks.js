const xss = require("xss");
const { exec, escape } = require("../db/mysql");

const getList = async () => {
    let sql = `select * from notebooks order by updated_time desc`;
    return await exec(sql);
};

const getLatestUpdatedByPage = async (current, size) => {
  current *= size;
  let sql = `select * from notebooks order by updated_time desc `
          + `limit ${current}, ${size}`;
  return exec(sql);
}

module.exports = {
  getList,
  getLatestUpdatedByPage
};