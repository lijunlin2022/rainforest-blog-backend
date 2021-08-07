const { htmlEncode } = require("../utils/htmlUtils");
const { exec, escape } = require("../db/mysql");

// 增加
const add = async (data = {}) => {
  let { name, description } = data;
  name = htmlEncode(name);
  description = htmlEncode(data.description);

  const created_time = Date.now();
  const updated_time = Date.now();

  let sql = `insert into notebooks (name, description, created_time, updated_time) values (`
            + escape(name) + `,`
            + escape(description) + `,`
            + `${created_time}` + `,`
            + `${updated_time}` + `)`;

  const insertData = exec(sql);
  return {
    id: insertData.id,
  };
}

// 删除

// 修改
const update = async (id, data = {}) => {
  let { name, description } = data;
  name = htmlEncode(data.name);
  description = htmlEncode(data.description);
  
  const updated_time = Date.now();

  let sql = `update notebooks set `
            + `name = ` + escape(name) + `,`
            + `description = ` + escape(description) + `,`
            + `updated_time = ${updated_time} `
            + `where id = ${id}`;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
      return true;
  }
  return false;
}

// 查询单个
const getDetail = async (id) => {
  let sql = `select * from notebooks where id = ${id}`;
  const rows = await exec(sql);
  return rows[0];
}

// 查询多个
const getList = async (options) => {
  const defaults = {
    keyword: null,
    current: 0,
    size: 10,
  };
  Object.assign(defaults, options);

  let sql = `select * from notebooks where 1 = 1 `;
  if (defaults.keyword != null) {
    sql += `and name like '%${defaults.keyword}%' `;
  }
  sql += `order by name asc `;
  if (defaults.current != null && defaults.size != null) {
      defaults.current *= defaults.size;
      sql += `limit ${defaults.current}, ${defaults.size}`;
  }
  return await exec(sql);
};

module.exports = {
  getList,
  getDetail,
  add,
  update,
};