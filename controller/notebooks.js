const { htmlEncode } = require("../utils/htmlUtils");
const { exec, escape } = require("../db/mysql");

// 增加
const add = async (data = {}) => {
  let { name, description } = data;
  name = htmlEncode(name);
  description = htmlEncode(data.description);

  const createdTime = Date.now();
  const updatedTime = Date.now();

  let sql = `insert into notebooks (name, description, created_time, updated_time) values (`
            + escape(name) + `,`
            + escape(description) + `,`
            + `${createdTime}` + `,`
            + `${updatedTime}` + `)`;

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
  
  const updatedTime = Date.now();

  let sql = `update notebooks set `
            + `name = ` + escape(name) + `,`
            + `description = ` + escape(description) + `,`
            + `updated_time = ${updatedTime} `
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
    size: 9,
    sortMode: "lastUpdate",
  };
  Object.assign(defaults, options);

  let sql = `select * from notebooks where 1 = 1 `;
  if (defaults.keyword != null) {
    sql += `and name like '%${defaults.keyword}%' `;
  }
  if (defaults.sortMode === "name") {
    sql += `order by name asc `;
  } else {
    sql += `order by updated_time desc `;
  }
  
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